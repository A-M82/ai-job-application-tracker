// routes/ai.js — OpenAI-powered features: cover letter generation + job detail extraction
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// POST /api/ai/cover-letter — generate a cover letter from a job description
router.post('/cover-letter', async (req, res) => {
  const { jobDescription, background } = req.body;

  if (!jobDescription) {
    return res.status(400).json({ error: 'jobDescription is required' });
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a career coach who writes concise, professional, tailored cover letters. Keep it under 350 words. Do not leave placeholders like [Your Name] unfilled unless information is genuinely missing.',
        },
        {
          role: 'user',
          content: `Job description:\n${jobDescription}\n\nApplicant background:\n${
            background || 'Not provided — write a general but professional cover letter.'
          }`,
        },
      ],
    });

    res.json({ coverLetter: completion.choices[0].message.content });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate cover letter', details: err.message });
  }
});

// POST /api/ai/extract-job — pull structured fields out of a pasted job posting
router.post('/extract-job', async (req, res) => {
  const { postingText } = req.body;

  if (!postingText) {
    return res.status(400).json({ error: 'postingText is required' });
  }

  try {
    const completion = await client.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [
        {
          role: 'system',
          content: 'Extract the job details from the posting below. If a field is not mentioned, use null.',
        },
        { role: 'user', content: postingText },
      ],
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'job_posting_details',
          strict: true,
          schema: {
            type: 'object',
            properties: {
              company: { type: 'string' },
              jobTitle: { type: 'string' },
              location: { type: 'string' },
              remote: { type: 'boolean' },
              salaryMin: { type: ['number', 'null'] },
              salaryMax: { type: ['number', 'null'] },
            },
            required: ['company', 'jobTitle', 'location', 'remote', 'salaryMin', 'salaryMax'],
            additionalProperties: false,
          },
        },
      },
    });

    const extracted = JSON.parse(completion.choices[0].message.content);
    res.json(extracted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to extract job details', details: err.message });
  }
});

// POST /api/ai/interview-questions — generate tailored interview questions
router.post('/interview-questions', async (req, res) => {
  const { jobDescription, role, company } = req.body;

  if (!jobDescription && !role) {
    return res.status(400).json({ error: 'jobDescription or role is required' });
  }

  try {
    const prompt = `Generate up to 10 concise, focused interview questions tailored for the role: ${role || 'N/A'} at ${company || 'N/A'}.\nJob description:\n${jobDescription || 'Not provided.'}`;

    const completion = await client.chat.completions.create({
      model: 'gpt-5.4-mini',
      messages: [
        { role: 'system', content: 'You are an interview coach who writes focused, relevant interview questions.' },
        { role: 'user', content: prompt },
      ],
    });

    const text = completion.choices[0].message.content;
    // Split by lines and filter empty items; if response is a JSON array, try to parse it
    let questions = [];
    try {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) questions = parsed;
    } catch (e) {
      questions = text.split(/\r?\n+/).map((s) => s.replace(/^\d+\.\s*/, '').trim()).filter(Boolean);
    }

    res.json({ questions });
  } catch (err) {
    res.status(502).json({ error: 'Failed to generate interview questions', details: err.message });
  }
});

module.exports = router;
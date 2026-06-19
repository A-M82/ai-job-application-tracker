import { useState } from 'react'

function InterviewPrep({ applications }) {
  const [aiConnected, setAiConnected] = useState(false)

  const interviewApplications = applications.filter(
    (application) => application.status === 'Interview'
  )

  return (
    <section className="dashboard">
      <h2>AI Interview Preparation</h2>

      <p>
        Prepare for upcoming interviews with suggested focus areas and
        practice questions.
      </p>

      {!aiConnected ? (
        <div style={{ textAlign: 'center', margin: '25px 0' }}>
          <button onClick={() => setAiConnected(true)}>
            Connect AI Tool
          </button>
        </div>
      ) : (
        <div
          style={{
            background: '#ecfdf5',
            border: '1px solid #10b981',
            padding: '16px',
            borderRadius: '10px',
            marginBottom: '25px',
            textAlign: 'center',
          }}
        >
          <strong>AI Tool Connected Successfully</strong>
          <br />
          Your AI tool is ready to be configured. Connect ChatGPT, Gemini,
          Claude, or another AI assistant to generate customized interview
          questions based on the selected position and company.
        </div>
      )}

      {interviewApplications.length === 0 ? (
        <p>No interview preparation needed yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Company</th>
              <th>Position</th>
              <th>Suggested Questions</th>
            </tr>
          </thead>

          <tbody>
            {interviewApplications.map((application, index) => (
              <tr key={index}>
                <td>{application.company}</td>
                <td>{application.position}</td>
                <td>
                  Tell me about yourself.
                  <br />
                  Why are you interested in this role?
                  <br />
                  What relevant experience do you bring?
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  )
}

export default InterviewPrep
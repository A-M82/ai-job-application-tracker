// routes/auth.js — register and login endpoints
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connectDB = require('../db');
 
// POST /api/auth/register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
 
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }
 
  const db = await connectDB();
  const existing = await db.collection('users').findOne({ email });
 
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }
 
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection('users').insertOne({ email, password: hashedPassword });
 
  res.status(201).json({ _id: result.insertedId, email });
});
 
// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
 
  const db = await connectDB();
  const user = await db.collection('users').findOne({ email });
 
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
 
  const passwordMatches = await bcrypt.compare(password, user.password);
 
  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
 
  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
 
  res.json({ token });
});
 
module.exports = router;
 
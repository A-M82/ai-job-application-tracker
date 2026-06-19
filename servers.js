// server.js — main entry point
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const applicationsRouter = require('./routes/applications');
const companiesRouter = require('./routes/companies');
const authRouter = require('./routes/auth');
const aiRouter = require('./routes/ai');
const requireAuth = require('./middleware/auth');
 
const app = express();
app.use(express.json()); // lets req.body parse incoming JSON
 
app.use('/api/auth', authRouter); // public — no token needed to register/login
app.use('/api/applications', requireAuth, applicationsRouter); // protected
app.use('/api/companies', requireAuth, companiesRouter); // protected
app.use('/api/ai', requireAuth, aiRouter); // protected — costs money per call
 
const PORT = process.env.PORT || 3000;
 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
// server.js ? main entry point
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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});
 
app.use('/api/auth', authRouter); // public ? no token needed to register/login
app.use('/api/applications', requireAuth, applicationsRouter); // protected
app.use('/api/companies', requireAuth, companiesRouter); // protected
app.use('/api/ai', aiRouter); // AI prep needs to work from the current frontend login flow
 
const PORT = process.env.PORT || 3000;
 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});

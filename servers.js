// server.js — main entry point
require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const applicationsRouter = require('./routes/applications');
 
const app = express();
app.use(express.json()); // lets req.body parse incoming JSON
 
app.use('/api/applications', applicationsRouter);
 
const PORT = process.env.PORT || 3000;
 
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
 
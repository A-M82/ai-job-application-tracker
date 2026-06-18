// db.js — shared MongoDB connection, import this wherever you need to query
require('dotenv').config();
const { MongoClient } = require('mongodb');
 
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
 
let db;
 
async function connectDB() {
  if (db) return db;
  await client.connect();
  db = client.db('job_tracker'); // database name — change if yours differs
  console.log('Connected to MongoDB');
  return db;
}
 
module.exports = connectDB;
 
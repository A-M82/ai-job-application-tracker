// routes/applications.js — CRUD endpoints for the "applications" collection
const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const connectDB = require('../db');
 
// GET /api/applications — list all applications
router.get('/', async (req, res) => {
  const db = await connectDB();
  const applications = await db.collection('applications').find().toArray();
  res.json(applications);
});
 
// GET /api/applications/:id — get a single application
router.get('/:id', async (req, res) => {
  const db = await connectDB();
  const application = await db
    .collection('applications')
    .findOne({ _id: new ObjectId(req.params.id) });
 
  if (!application) return res.status(404).json({ error: 'Not found' });
  res.json(application);
});
 
// POST /api/applications — create a new application
router.post('/', async (req, res) => {
  const db = await connectDB();
  const result = await db.collection('applications').insertOne(req.body);
  res.status(201).json({ _id: result.insertedId, ...req.body });
});
 
// PUT /api/applications/:id — update an application
router.put('/:id', async (req, res) => {
  const db = await connectDB();
  const result = await db
    .collection('applications')
    .updateOne({ _id: new ObjectId(req.params.id) }, { $set: req.body });
 
  if (result.matchedCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ updated: true });
});
 
// DELETE /api/applications/:id — delete an application
router.delete('/:id', async (req, res) => {
  const db = await connectDB();
  const result = await db
    .collection('applications')
    .deleteOne({ _id: new ObjectId(req.params.id) });
 
  if (result.deletedCount === 0) return res.status(404).json({ error: 'Not found' });
  res.json({ deleted: true });
});
 
module.exports = router;
 
const { getDb } = require('../database/connect');
const { ObjectId } = require('mongodb');

const getAllHandTools = async (req, res) => {
  try {
    const db = getDb();
    const tools = await db.collection('hand_tools').find().toArray();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: 'Failed to get hand tools' });
  }
};

const createHandTool = async (req, res) => {
  try {
    const db = getDb();
    const newTool = req.body;
    const result = await db.collection('hand_tools').insertOne(newTool);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create hand tool' });
  }
};

const updateHandTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = req.body;
    const result = await db.collection('hand_tools').updateOne(
      { _id: new ObjectId(id) },
      { $set: updates }
    );
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update hand tool' });
  }
};

const deleteHandTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const result = await db.collection('hand_tools').deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete hand tool' });
  }
};

module.exports = {
  getAllHandTools,
  createHandTool,
  updateHandTool,
  deleteHandTool,
};

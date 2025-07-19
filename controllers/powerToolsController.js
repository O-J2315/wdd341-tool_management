const { getDb } = require("../database/connect");
const { ObjectId } = require("mongodb");

const getAllPowerTools = async (req, res) => {
  try {
    const db = getDb();
    const tools = await db.collection("power_tools").find().toArray();
    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: "Failed to get power tools" });
  }
};

const getPowerToolById = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const tool = await db
      .collection("power_tools")
      .findOne({ _id: new ObjectId(id) });
    if (!tool) {
      return res.status(404).json({ error: "Power tool not found" });
    }
    res.json(tool);
  } catch (err) {
    res.status(500).json({ error: "Failed to get power tool" });
  }
};

const createPowerTool = async (req, res) => {
  try {
    const db = getDb();
    const powerTool = {
      name: req.body.name,
      brand: req.body.brand,
      condition: req.body.condition,
      status: req.body.status,
      notes: req.body.notes
    };

    const result = await db.collection('power_tools').insertOne(powerTool);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error creating power tool:', err);
    res.status(500).json({ error: 'Failed to create power tool' });
  }
};

const updatePowerTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = req.body;

    const result = await db
      .collection('power_tools')
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Power tool not found' });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error('Error updating power tool:', err);
    res.status(500).json({ error: 'Failed to update power tool' });
  }
};

const deletePowerTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const result = await db
      .collection("power_tools")
      .deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete power tool" });
    res.status(404).json({ error: "Power tool not found" });
    
  }
};

module.exports = {
  getAllPowerTools,
  createPowerTool,
  updatePowerTool,
  deletePowerTool,
  getPowerToolById,
};

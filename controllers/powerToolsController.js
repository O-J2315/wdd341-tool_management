const { getDb } = require("../database/connect");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

const powerToolSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  model: Joi.string().required(),
  serialNumber: Joi.string().required(),
  condition: Joi.string().valid("new", "good", "fair", "poor").required(),
  status: Joi.string()
    .valid("available", "assigned", "repair", "unavailable")
    .required(),
  notes: Joi.string().allow("").optional(),
  lastServiced: Joi.date().iso().optional(),
});

const getAllPowerTools = async (req, res) => {
  try {
    const db = getDb();
    const tools = await db.collection("power_tools").find().toArray();
    res.json(tools);
  } catch (err) {
    res.send('{"error": "Failed to get power tools"}');
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
  const tool = req.body;

  const { error } = powerToolSchema.validate(tool);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = getDb();
    const result = await db.collection("power_tools").insertOne(tool);
    res.status(201).json({
      message: "Power tool created successfully",
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create power tool" });
  }
};

const updatePowerTool = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const { error } = powerToolSchema.validate(updates);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = getDb();
    const result = await db
      .collection("power_tools")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Power tool not found" });
    }

    res.json({ message: "Power tool updated successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update power tool" });
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

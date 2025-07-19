const { getDb } = require("../database/connect");
const { ObjectId } = require("mongodb");
const Joi = require("joi");

//Schema

const handToolSchema = Joi.object({
  name: Joi.string().required(),
  brand: Joi.string().required(),
  size: Joi.string().valid("Small", "Medium", "Large").required(),
  condition: Joi.string().valid("new", "good", "fair", "poor").required(),
  status: Joi.string()
    .valid("available", "assigned", "repair", "unavailable")
    .required(),
  notes: Joi.string().allow("").optional(),
});

const getAllHandTools = async (req, res) => {
  try {
    const db = getDb();
    console.log("Fetching all hand tools");
    const tools = await db.collection("hand_tools").find().toArray();
    console.log(tools);

    res.json(tools);
  } catch (err) {
    res.status(500).json({ error: "Failed to get hand tools" });
  }
};

const getHandToolById = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const tool = await db
      .collection("hand_tools")
      .findOne({ _id: new ObjectId(id) });
    if (!tool) {
      return res.status(404).json({ error: "Hand tool not found" });
    }
    res.json(tool);
  } catch (err) {
    res.status(500).json({ error: "Failed to get hand tool" });
  }
};

const createHandTool = async (req, res) => {
  const tool = req.body;

  // Validate tool
  const { error } = handToolSchema.validate(tool);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = getDb();
    const result = await db.collection("hand_tools").insertOne(tool);
    res.status(201).json({
      message: "Hand tool created successfully",
      id: result.insertedId,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to create hand tool" });
  }
};

const updateHandTool = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  // Validate incoming data
  const { error } = handToolSchema.validate(updates);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const db = getDb();
    const result = await db
      .collection("hand_tools")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Hand tool not found" });
    }

    res.json({ message: "Hand tool updated successfully", result });
  } catch (err) {
    res.status(500).json({ error: "Failed to update hand tool" });
  }
};

const deleteHandTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const result = await db
      .collection("hand_tools")
      .deleteOne({ _id: new ObjectId(id) });
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Failed to delete hand tool" });
  }
};

module.exports = {
  getAllHandTools,
  createHandTool,
  updateHandTool,
  deleteHandTool,
  getHandToolById,
};

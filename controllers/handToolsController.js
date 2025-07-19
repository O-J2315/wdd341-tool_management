const { getDb } = require("../database/connect");
const { ObjectId } = require("mongodb");

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
  const tool = {
    name: req.body.name,
    brand: req.body.brand,
    size: req.body.size,
    condition: req.body.condition,
    status: req.body.status,
    notes: req.body.notes,
  };

  console.log("🛠️ Creating hand tool:", tool);

  try {
    const result = await getDb()
      .collection("hand_tools")
      .insertOne(tool);

    res.status(201).json({
      message: "Hand tool created successfully",
      id: result.insertedId
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating hand tool",
      error: err.message
    });
  }
};

const updateHandTool = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    const updates = req.body;
    const result = await db
      .collection("hand_tools")
      .updateOne({ _id: new ObjectId(id) }, { $set: updates });
    res.json(result);
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

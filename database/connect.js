const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODB_URI);

let db;

const connectDb = async (callback) => {
  try {
    await client.connect();
    db = client.db("tools_manager"); // DB name
    console.log("✅ Connected to MongoDB");
    callback();
  } catch (err) {
    console.error("❌ DB connection failed", err);
  }
};

const getDb = () => {
  if (!db) throw new Error("Database not initialized");
  return db;
};

module.exports = { connectDb, getDb };

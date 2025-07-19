require("dotenv").config();
const express = require("express");
const { connectDb } = require("./database/connect");
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());

app.use(bodyParser.json());

app.use((require, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});


// Import and use centralized routes
app.use("/", require("./routes"));

connectDb(() => {
  app.listen(3000, () =>
    console.log("🚀 Server running on http://localhost:3000"),
  );
});

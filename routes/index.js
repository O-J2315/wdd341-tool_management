const express = require("express");
const router = express.Router();

const powerToolsRoutes = require("./powerTools");
const handToolsRoutes = require("./handTools");

router.use("/", require("./swagger"));

router.use("/power-tools", powerToolsRoutes);
router.use("/hand-tools", handToolsRoutes);

//Base route for testing
router.get("/", (req, res) => {
  res.send("Welcome to the Tool Management API");
});

module.exports = router;

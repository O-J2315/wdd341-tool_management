const express = require("express");
const router = express.Router();
const controller = require("../controllers/powerToolsController");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", controller.getAllPowerTools);
router.get("/:id", controller.getPowerToolById);

router.post("/", isAuthenticated, controller.createPowerTool);
router.put("/:id", isAuthenticated, controller.updatePowerTool);
router.delete("/:id", isAuthenticated, controller.deletePowerTool);

module.exports = router;

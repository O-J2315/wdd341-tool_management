const express = require("express");
const router = express.Router();
const controller = require("../controllers/powerToolsController");

router.get("/", controller.getAllPowerTools);
router.get("/:id", controller.getPowerToolById);

router.post("/", controller.createPowerTool);
router.put("/:id", controller.updatePowerTool);
router.delete("/:id", controller.deletePowerTool);

module.exports = router;

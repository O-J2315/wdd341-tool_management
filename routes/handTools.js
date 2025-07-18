const express = require("express");
const router = express.Router();
const controller = require("../controllers/handToolsController");

router.get("/", controller.getAllHandTools);
router.get("/:id", controller.getHandToolById);

router.post("/", controller.createHandTool);
router.put("/:id", controller.updateHandTool);
router.delete("/:id", controller.deleteHandTool);

module.exports = router;

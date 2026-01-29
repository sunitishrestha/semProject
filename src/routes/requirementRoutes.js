const express = require("express");
const router = express.Router();
const requirementController = require("../controllers/requirementController");

router.post("/", requirementController.createRequirement);
router.get("/", requirementController.getAllRequirements);
router.put("/:id", requirementController.updateRequirement);
router.delete("/:id", requirementController.deleteRequirement);

module.exports = router;

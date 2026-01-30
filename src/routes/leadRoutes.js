const express = require("express");
const router = express.Router();
const leadController = require("../controllers/leadController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, leadController.createLead);
router.get("/:eventId/status", authenticate, leadController.getLeadByEvent);
router.put("/:id", authenticate, leadController.updateLead);

module.exports = router;

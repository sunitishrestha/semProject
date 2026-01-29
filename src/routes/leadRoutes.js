const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, attendanceController.createLead);
router.get("/:id/status", authenticate, attendanceController.getLeadByEvent);
router.put("/:id", authenticate, attendanceController.updateLead);

module.exports = router;

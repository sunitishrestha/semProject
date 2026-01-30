const express = require("express");
const router = express.Router();
const attendanceController = require("../controllers/attendanceController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, attendanceController.markAttendance);
router.get(
  "/participants/:eventId",
  authenticate,
  attendanceController.participantAttendanceReport,
);
router.get(
  "/leads/:eventId",
  authenticate,
  attendanceController.leadAttendanceReport,
);
router.get(
  "/volunteers/:eventId",
  authenticate,
  attendanceController.volunteerAttendanceReport,
);

module.exports = router;

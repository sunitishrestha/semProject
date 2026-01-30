const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, volunteerController.createVolunteer);
router.get("/", authenticate, volunteerController.getAllVolunteers);
router.put("/:id", authenticate, volunteerController.updateVolunteer);
router.delete("/:id", authenticate, volunteerController.deleteVolunteer);
router.put("/:id/task", authenticate, volunteerController.taskAssign);

module.exports = router;

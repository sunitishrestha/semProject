const express = require("express");
const router = express.Router();
const participantController = require("../controllers/participantController");
const { authenticate } = require("../middleware/auth");

router.post("/", authenticate, participantController.createParticipant);
router.get("/", authenticate, participantController.getAllParticipants);
router.put("/:id", authenticate, participantController.updateParticipant);
router.delete("/:id", authenticate, participantController.deleteParticipant);

module.exports = router;

const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const { authenticate } = require("../middleware/auth");

router.put("/", authenticate, profileController.updateProfile);
router.post("/avatar", authenticate, profileController.updateAvatar);
router.put("/preferences", authenticate, profileController.updatePreferences);

module.exports = router;

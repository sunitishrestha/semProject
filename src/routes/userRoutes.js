const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticate } = require("../middleware/auth");

router.get("/me", authenticate, userController.getUserProfile);
router.put("/me", authenticate, userController.updateUserProfile);
// Admin only route
router.get("/", authenticate, userController.getAllUsers);
router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;

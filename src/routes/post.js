// src/routes/post.js

const express = require("express");
const { body } = require("express-validator");
const {
  getAllPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/postController");
const { authenticate } = require("../middleware/auth");
const { validate } = require("../middleware/validator");

const router = express.Router();

// Public routes
router.get("/", getAllPosts);
router.get("/:id", getPost);

// Protected routes (require authentication)
router.post(
  "/",
  authenticate,
  [
    body("title").trim().notEmpty().withMessage("Title is required"),
    body("content").trim().notEmpty().withMessage("Content is required"),
    validate,
  ],
  createPost,
);

router.put(
  "/:id",
  authenticate,
  [
    body("title").optional().trim().notEmpty(),
    body("content").optional().trim().notEmpty(),
    validate,
  ],
  updatePost,
);

router.delete("/:id", authenticate, deletePost);

module.exports = router;

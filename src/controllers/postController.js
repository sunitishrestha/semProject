// src/controllers/postController.js

const { Post, User, Tag } = require("../models");
const { Op } = require("sequelize");

// CREATE - Create new post
const createPost = async (req, res) => {
  try {
    const { title, content, tagNames } = req.body;

    // 1. Create post
    const post = await Post.create({
      title,
      content,
      userId: req.user.id, // From authenticate middleware
    });

    // 2. Handle tags (if provided)
    if (tagNames && tagNames.length > 0) {
      // findOrCreate returns [instance, created]
      const tagPromises = tagNames.map((name) =>
        Tag.findOrCreate({ where: { name } }),
      );
      const tagResults = await Promise.all(tagPromises);
      const tags = tagResults.map(([tag]) => tag);

      // Add tags to post (many-to-many magic method)
      await post.addTags(tags);
    }

    // 3. Reload with associations
    await post.reload({
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "lastName"],
        },
        { model: Tag, as: "tags", attributes: ["id", "name"] },
      ],
    });

    res.status(201).json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Create post error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to create post",
    });
  }
};

// READ - Get all posts with filters and pagination
const getAllPosts = async (req, res) => {
  try {
    // Extract query parameters
    const { page = 1, limit = 10, search = "", userId, tag } = req.query;

    const offset = (page - 1) * limit;

    // Build WHERE clause
    const where = {};

    // Search in title or content
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
      ];
    }

    // Filter by user
    if (userId) {
      where.userId = userId;
    }

    // Build include clause
    const include = [
      {
        model: User,
        as: "author",
        attributes: ["id", "firstName", "lastName"],
      },
      {
        model: Tag,
        as: "tags",
        attributes: ["id", "name"],
      },
    ];

    // Filter by tag
    if (tag) {
      include[1].where = { name: tag };
    }

    // Execute query with count
    const { count, rows: posts } = await Post.findAndCountAll({
      where,
      include,
      order: [["createdAt", "DESC"]],
      limit: parseInt(limit),
      offset: parseInt(offset),
      distinct: true, // Important for many-to-many joins
    });

    res.json({
      success: true,
      posts,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
        hasMore: offset + posts.length < count,
      },
    });
  } catch (error) {
    console.error("Get posts error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get posts",
    });
  }
};

// READ - Get single post
const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
        },
      ],
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Get post error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to get post",
    });
  }
};

// UPDATE - Update post
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, tagNames } = req.body;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Check authorization
    if (post.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to update this post",
      });
    }

    // Update post fields
    await post.update({ title, content });

    // Update tags if provided
    if (tagNames) {
      const tagPromises = tagNames.map((name) =>
        Tag.findOrCreate({ where: { name } }),
      );
      const tagResults = await Promise.all(tagPromises);
      const tags = tagResults.map(([tag]) => tag);

      // Replace all tags
      await post.setTags(tags);
    }

    // Reload with associations
    await post.reload({
      include: [
        { model: User, as: "author" },
        { model: Tag, as: "tags" },
      ],
    });

    res.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error("Update post error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to update post",
    });
  }
};

// DELETE - Delete post
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Check authorization
    if (post.userId !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: "Not authorized to delete this post",
      });
    }

    // Delete post (associations deleted automatically with CASCADE)
    await post.destroy();

    res.json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    console.error("Delete post error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to delete post",
    });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
};

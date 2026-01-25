// src/middleware/auth.js

const jwt = require("jsonwebtoken");
const { User } = require("../models");
const config = require("../config");

const authenticate = async (req, res, next) => {
  try {
    // 1. Get token from Authorization header
    // Format: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: "No token provided",
      });
    }

    // 2. Extract token (remove "Bearer " prefix)
    const token = authHeader.substring(7);

    // 3. Verify JWT signature and decode payload
    let decoded;
    try {
      decoded = jwt.verify(token, config.jwt.secret);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          error: "Token expired",
        });
      }
      return res.status(401).json({
        success: false,
        error: "Invalid token",
      });
    }

    // 4. Find user from token payload
    const user = await User.findByPk(decoded.userId, {
      attributes: { exclude: ["password"] }, // Don't include password
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "User not found",
      });
    }

    // 5. Attach user to request object
    req.user = user;

    // 6. Continue to next middleware/handler
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      error: "Authentication failed",
    });
  }
};

module.exports = { authenticate };

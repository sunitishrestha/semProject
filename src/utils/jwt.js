// src/utils/jwt.js

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../config");

/**
 * Generate JWT access token
 * Expires in 15 minutes
 */
const generateAccessToken = (userId) => {
  return jwt.sign(
    { userId }, // Payload (data stored in token)
    config.jwt.secret, // Secret key for signing
    { expiresIn: config.jwt.expire }, // Token expiration (15m)
  );

  // Returns: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  // Decoded payload: { userId: 1, iat: 1641206400, exp: 1641207300 }
};

/**
 * Generate random refresh token
 * Stored in database, expires in 7 days
 */
const generateRefreshToken = () => {
  // Generate 40 random bytes, convert to hex string
  return crypto.randomBytes(40).toString("hex");

  // Returns: "a1b2c3d4e5f6..."
};

/**
 * Verify JWT access token
 * Returns decoded payload or null if invalid
 */
const verifyAccessToken = (token) => {
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    // Returns: { userId: 1, iat: 1641206400, exp: 1641207300 }
    return decoded;
  } catch (error) {
    // Token is invalid, expired, or malformed
    return null;
  }
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
};

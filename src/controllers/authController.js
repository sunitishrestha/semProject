// src/controllers/authController.js

const bcrypt = require("bcryptjs");
const { User, RefreshToken } = require("../models");
const { generateAccessToken, generateRefreshToken } = require("../utils/jwt");

const register = async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        error: "Email already registered",
      });
    }

    // 2. Hash password (NEVER store plain passwords!)
    // Cost factor of 10 is a good balance between security and performance
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user
    const user = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });

    // 4. Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();

    // 5. Save refresh token to database
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiresAt,
    });

    // 6. Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      user: userResponse,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
};

//login implementation
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // 2. Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        error: "Invalid email or password",
      });
    }

    // 3. Generate tokens
    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken();

    // 4. Save refresh token
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
      expiresAt,
    });

    // 5. Remove password from response
    const userResponse = user.toJSON();
    delete userResponse.password;

    res.json({
      success: true,
      user: userResponse,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      error: "Login failed",
    });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        error: "Refresh token required",
      });
    }

    // 1. Find refresh token in database
    const tokenRecord = await RefreshToken.findOne({
      where: { token: refreshToken },
    });

    if (!tokenRecord) {
      return res.status(401).json({
        success: false,
        error: "Invalid refresh token",
      });
    }

    // 2. Check if token is expired
    if (new Date() > tokenRecord.expiresAt) {
      // Delete expired token
      await tokenRecord.destroy();
      return res.status(401).json({
        success: false,
        error: "Refresh token expired",
      });
    }

    // 3. Generate new access token
    const accessToken = generateAccessToken(tokenRecord.userId);

    res.json({
      success: true,
      accessToken,
    });
  } catch (error) {
    console.error("Token refresh error:", error);
    res.status(500).json({
      success: false,
      error: "Token refresh failed",
    });
  }
};

//logout implementation
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    await RefreshToken.destroy({
      where: { token: refreshToken },
    });

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      error: "Logout failed",
    });
  }
};

module.exports = {
  register,
  login,
  refresh,
  logout,
};

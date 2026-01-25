// src/models/User.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const bcrypt = require("bcryptjs");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("user", "admin", "moderator"),
      defaultValue: "user",
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,

    // Hooks
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user) => {
        if (user.changed("password")) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  },
);

// ==========================================
// CLASS METHODS (Static)
// Called on the Model: User.methodName()
// ==========================================

/**
 * Find user by email (case-insensitive)
 */
User.findByEmail = async function (email) {
  return await this.findOne({
    where: {
      email: email.toLowerCase(),
    },
  });
};

/**
 * Get user statistics
 */
User.getStatistics = async function () {
  const [total, active, admins] = await Promise.all([
    this.count(),
    this.count({ where: { isActive: true } }),
    this.count({ where: { role: "admin" } }),
  ]);

  return { total, active, admins };
};

/**
 * Search users by name or email
 */
User.search = async function (query, limit = 10) {
  const { Op } = require("sequelize");

  return await this.findAll({
    where: {
      [Op.or]: [
        { firstName: { [Op.iLike]: `%${query}%` } },
        { lastName: { [Op.iLike]: `%${query}%` } },
        { email: { [Op.iLike]: `%${query}%` } },
      ],
    },
    attributes: { exclude: ["password"] },
    limit,
    order: [["firstName", "ASC"]],
  });
};

/**
 * Get active users created in the last N days
 */
User.getRecentUsers = async function (days = 7) {
  const { Op } = require("sequelize");
  const date = new Date();
  date.setDate(date.getDate() - days);

  return await this.findAll({
    where: {
      isActive: true,
      createdAt: { [Op.gte]: date },
    },
    attributes: { exclude: ["password"] },
    order: [["createdAt", "DESC"]],
  });
};

/**
 * Bulk create users (useful for seeding)
 */
User.bulkCreate = async function (users) {
  return await this.bulkCreate(users, {
    validate: true,
    individualHooks: true, // Run beforeCreate hooks for each user
  });
};

// ==========================================
// INSTANCE METHODS
// Called on a user instance: user.methodName()
// ==========================================

/**
 * Verify password
 */
User.prototype.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

/**
 * Update password
 */
User.prototype.updatePassword = async function (newPassword) {
  this.password = newPassword;
  return await this.save(); // beforeUpdate hook will hash it
};

/**
 * Get full name
 */
User.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

/**
 * Check if user is admin
 */
User.prototype.isAdmin = function () {
  return this.role === "admin";
};

/**
 * Check if user is moderator or admin
 */
User.prototype.isModerator = function () {
  return this.role === "admin" || this.role === "moderator";
};

/**
 * Check if user can edit a resource
 */
User.prototype.canEdit = function (resource) {
  // Admins can edit everything
  if (this.isAdmin()) {
    return true;
  }

  // Users can edit their own resources
  return this.id === resource.userId;
};

/**
 * Update last login timestamp
 */
User.prototype.recordLogin = async function () {
  this.lastLoginAt = new Date();
  return await this.save();
};

/**
 * Deactivate user account
 */
User.prototype.deactivate = async function () {
  this.isActive = false;
  return await this.save();
};

/**
 * Reactivate user account
 */
User.prototype.reactivate = async function () {
  this.isActive = true;
  return await this.save();
};

/**
 * Get user's JSON representation (excluding password)
 */
User.prototype.toSafeJSON = function () {
  const values = this.toJSON();
  delete values.password;
  return values;
};

module.exports = User;

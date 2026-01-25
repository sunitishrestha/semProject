// src/models/Profile.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Profile = sequelize.define(
  "Profile",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true, // Enforces one-to-one
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "profiles",
    timestamps: true,
  },
);

// Define associations in src/models/index.js
// User.hasOne(Profile, { foreignKey: 'userId', as: 'profile' });
// Profile.belongsTo(User, { foreignKey: 'userId', as: 'user' });

module.exports = Profile;

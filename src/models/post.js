// src/models/Post.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "posts",
    timestamps: true,
  },
);

// Define associations in src/models/index.js
// Post.belongsTo(User, { foreignKey: 'userId', as: 'author' });
// User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });

module.exports = Post;

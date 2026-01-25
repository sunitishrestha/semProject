// src/models/Tag.js

const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Tag = sequelize.define(
  "Tag",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: "tags",
    timestamps: true,
  },
);

// Define associations in src/models/index.js
// Post.belongsToMany(Tag, { through: 'post_tags', foreignKey: 'postId', as: 'tags' });
// Tag.belongsToMany(Post, { through: 'post_tags', foreignKey: 'tagId', as: 'posts' });

module.exports = Tag;

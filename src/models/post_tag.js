const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const post_tags = sequelize.define(
  "PostTag",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tagId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "post_tags",
    timestamps: true,
  },
);

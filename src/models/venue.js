const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Venue = sequelize.define(
  "Venue",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    venue_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    open_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    close_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: "venues",
    timestamps: true,
  },
);

module.exports = Venue;

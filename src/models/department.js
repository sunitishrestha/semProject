const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Department = sequelize.define(
  "Department",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    department_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    faculty_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "departments",
    timestamps: true,
  },
);

module.exports = Department;

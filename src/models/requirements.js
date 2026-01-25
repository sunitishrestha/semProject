const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Department = require("./department");

const Requirement = sequelize.define(
  "Requirement",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    semester: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "departments",
        key: "id",
      },
    },
  },
  {
    tableName: "requirements",
    timestamps: true,
  },
);

// Associations
Requirement.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});
Department.hasMany(Requirement, {
  foreignKey: "department_id",
  as: "requirements",
});

module.exports = Requirement;

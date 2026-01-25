const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Requirement = require("./requirements");
const Event = require("./event");

const Lead = sequelize.define(
  "Lead",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
      },
    },
    req_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "requirements",
        key: "id",
      },
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "events",
        key: "id",
      },
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "leads",
    timestamps: true,
  },
);

// Associations
Lead.belongsTo(User, { foreignKey: "user_id", as: "user" });
User.hasMany(Lead, { foreignKey: "user_id", as: "leads" });

Lead.belongsTo(Requirement, { foreignKey: "req_id", as: "requirement" });
Requirement.hasMany(Lead, { foreignKey: "req_id", as: "leads" });

Lead.belongsTo(Event, { foreignKey: "event_id", as: "event" });
Event.hasMany(Lead, { foreignKey: "event_id", as: "leads" });

module.exports = Lead;

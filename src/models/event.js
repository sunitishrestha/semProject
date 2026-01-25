const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Venue = require("./venue");
const Department = require("./department");

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "upcoming",
    },
    venue_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "venues",
        key: "id",
      },
    },
    department_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "departments",
        key: "id",
      },
    },
    lead_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: "events",
    timestamps: true,
  },
);

// Associations
Event.belongsTo(Venue, { foreignKey: "venue_id", as: "venue" });
Venue.hasMany(Event, { foreignKey: "venue_id", as: "events" });

Event.belongsTo(Department, { foreignKey: "department_id", as: "department" });
Department.hasMany(Event, { foreignKey: "department_id", as: "events" });

module.exports = Event;

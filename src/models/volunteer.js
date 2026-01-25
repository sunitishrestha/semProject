const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const Department = require("./department");
const Event = require("./event");

const Volunteer = sequelize.define(
  "Volunteer",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    volunteer_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
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
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "events",
        key: "id",
      },
    },
  },
  {
    tableName: "volunteers",
    timestamps: true,
  },
);

// Associations
Volunteer.belongsTo(User, {
  foreignKey: "user_id",
  as: "user",
});
User.hasMany(Volunteer, {
  foreignKey: "user_id",
  as: "volunteers",
});

Volunteer.belongsTo(Department, {
  foreignKey: "department_id",
  as: "department",
});
Department.hasMany(Volunteer, {
  foreignKey: "department_id",
  as: "volunteers",
});

Volunteer.belongsTo(Event, {
  foreignKey: "event_id",
  as: "event",
});
Event.hasMany(Volunteer, {
  foreignKey: "event_id",
  as: "volunteers",
});

module.exports = Volunteer;

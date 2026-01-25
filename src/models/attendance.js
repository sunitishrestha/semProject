const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Participation = require("./participation");
const Lead = require("./lead");
const Volunteer = require("./volunteer");

const Attendance = sequelize.define(
  "Attendance",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    part_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "participations",
        key: "id",
      },
    },
    lead_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "leads",
        key: "id",
      },
    },
    volunteer_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "volunteers",
        key: "id",
      },
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: "absent",
    },
  },
  {
    tableName: "attendances",
    timestamps: true,
  },
);

// Associations
Attendance.belongsTo(Participation, {
  foreignKey: "part_id",
  as: "participation",
});
Participation.hasMany(Attendance, { foreignKey: "part_id", as: "attendances" });

Attendance.belongsTo(Lead, { foreignKey: "lead_id", as: "lead" });
Lead.hasMany(Attendance, { foreignKey: "lead_id", as: "attendances" });

Attendance.belongsTo(Volunteer, {
  foreignKey: "volunteer_id",
  as: "volunteer",
});
Volunteer.hasMany(Attendance, {
  foreignKey: "volunteer_id",
  as: "attendances",
});

module.exports = Attendance;

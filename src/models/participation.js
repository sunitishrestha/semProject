const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./event");

const Participation = sequelize.define(
  "Participation",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    group_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "participations",
    timestamps: true,
  },
);

// Associations
Participation.belongsTo(Event, { foreignKey: "event_id", as: "event" });
Event.hasMany(Participation, { foreignKey: "event_id", as: "participations" });

module.exports = Participation;

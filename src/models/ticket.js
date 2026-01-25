const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./event");

const Ticket = sequelize.define(
  "Ticket",
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    payment: {
      type: DataTypes.STRING,
      defaultValue: "pending",
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: "tickets",
    timestamps: true,
  },
);

// Associations
Ticket.belongsTo(Event, { foreignKey: "event_id", as: "event" });
Event.hasMany(Ticket, { foreignKey: "event_id", as: "tickets" });

module.exports = Ticket;

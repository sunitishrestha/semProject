const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Event = require("./event");

const Sponsor = sequelize.define(
  "Sponsor",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cash_provide: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
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
    tableName: "sponsors",
    timestamps: true,
  },
);

// Associations
Sponsor.belongsTo(Event, { foreignKey: "event_id", as: "event" });
Event.hasMany(Sponsor, { foreignKey: "event_id", as: "sponsors" });

module.exports = Sponsor;

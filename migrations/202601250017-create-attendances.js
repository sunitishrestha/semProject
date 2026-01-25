"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("attendances", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      part_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "participations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      lead_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "leads",
          key: "id",
        },
      },
      volunteer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "volunteers",
          key: "id",
        },
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: "absent",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("attendances");
  },
};

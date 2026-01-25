'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'status', {
      type:Sequelize.STRING,
      allowNull: false,
      defaultValue: 'draft',
    });
  },

  async down (queryInterface, Sequelize) {
   await queryInterface.removeColumn('posts', 'status');
  }
};

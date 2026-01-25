// migrations/XXXXXX-create-post.js

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("posts", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Foreign key to users table
          key: "id",
        },
        onUpdate: "CASCADE", // Update post if user id changes
        onDelete: "CASCADE", // Delete post if user is deleted
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });

    // Add indexes for better query performance
    await queryInterface.addIndex("posts", ["userId"]);
    await queryInterface.addIndex("posts", ["createdAt"]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("posts");
  },
};

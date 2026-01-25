// migrations/XXXXXX-create-post-tags.js

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1️⃣ Create table
    await queryInterface.createTable("post_tags", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "posts",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      tagId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "tags",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
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

    // 2️⃣ Add indexes (THIS PART)
    await queryInterface.addIndex("post_tags", ["postId", "tagId"], {
      unique: true,
      name: "post_tags_unique",
    });

    await queryInterface.addIndex("post_tags", ["postId"]);
    await queryInterface.addIndex("post_tags", ["tagId"]);
  },

  async down(queryInterface) {
    await queryInterface.dropTable("post_tags");
  },
};

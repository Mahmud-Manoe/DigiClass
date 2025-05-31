'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("announcement", {
          announcement_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            class_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "classes",
                    key: "class_id",
                },
            },
            content: {
                type: Sequelize.TEXT,
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("announcement");
    },
};
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("exam", {
            exam_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            exam_name: {
                type: Sequelize.STRING,
            },
            exam_start: {
                type: Sequelize.DATE,
            },
            duration: {
                type: Sequelize.INTEGER,
            },
            class_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "classes",
                    key: "class_id",
                },
            },
            status: {
                type: Sequelize.ENUM('draft', 'active', 'finished'),
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
        await queryInterface.dropTable("exam");
    },
};
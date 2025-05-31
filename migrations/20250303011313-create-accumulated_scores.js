'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("accumulated_score", {
            accumulated_score_id: {
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
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "user_id",
                },
            },
            total_assignment_score: {
                type: Sequelize.INTEGER,
            },
            total_exam_score: {
                type: Sequelize.INTEGER,
            },
            final_score: {
                type: Sequelize.INTEGER,
            },
            grade: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("accumulated_score");
    },
};

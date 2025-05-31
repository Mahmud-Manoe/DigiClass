'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("exam_questions", {
            questions_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            question_number: {
                type: Sequelize.INTEGER,
            },
            exam_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "exam",
                    key: "exam_id",
                },
            },
            bank_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "question_bank",
                    key: "bank_id",
                },
            },
            score: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("exam_questions");
    },
};
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("exam_answers", {
            answer_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            questions_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "exam_questions",
                    key: "questions_id",
                },
            },
            users_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "user_id",
                },
            },
            student_answer: {
                type: Sequelize.JSON,
            },
            score: {
                type: Sequelize.INTEGER,
            },
            submitted_at: {
                type: Sequelize.DATE,
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
        await queryInterface.dropTable("exam_answers");
    },
};
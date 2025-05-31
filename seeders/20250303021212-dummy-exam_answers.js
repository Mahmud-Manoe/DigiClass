"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "exam_answers",
            [
                {
                    users_id: 2,
                    question_id: 1,
                    student_answer: JSON.stringify({ answer: "B" }),
                    score: 10,
                    submitted_at: new Date(),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("exam_answers", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
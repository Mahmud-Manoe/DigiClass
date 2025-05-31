"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "exam_questions",
            [
                {
                    question_number: 1,
                    exam_id: 1,
                    bank_id: 1,
                    score: 10,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("exam_questions", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
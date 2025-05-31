"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "question_bank",
            [
                {
                    question_type: "PG",
                    question_content: "Berapa hasil dari 2 + 2?",
                    answer_option: JSON.stringify(["A: 3", "B: 4", "C: 5", "D: 6"]),
                    correct_answer: JSON.stringify([ "B: 4" ]),
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("question_bank", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
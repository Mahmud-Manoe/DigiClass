"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "assignment_answers",
            [
                {
                    user_id: 2,
                    file_id: 1,
                    assignment_id: 1,
                    score: 85,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("assignment_answers", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
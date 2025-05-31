"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "accumulated_score",
            [
                {
                    class_id: 1,
                    user_id: 2,
                    total_assignment_score: 85,
                    total_exam_score: 10,
                    final_score: 95,
                    grade: "A",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("accumulated_score", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
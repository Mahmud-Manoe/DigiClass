"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "exam",
            [
                {
                    exam_name: "Ujian Matematika",
                    exam_start: new Date(),
                    duration: 60,
                    class_id: 1,
                    status: "active",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("exam", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
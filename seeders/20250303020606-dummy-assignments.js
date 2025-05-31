"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "assignments",
            [
                {
                    assignment_name: "Tugas Matematika",
                    file_id: 1,
                    class_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("assignments", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
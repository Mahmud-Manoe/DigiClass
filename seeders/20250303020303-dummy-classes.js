"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "classes",
            [
                {
                    class_name: "Kelas Matematika",
                    description: "Kelas Matematika tingkat SMP",
                    user_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("classes", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
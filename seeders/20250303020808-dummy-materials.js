"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "materials",
            [
                {
                    material_name: "Materi Aljabar",
                    material_content: "Dasar-dasar aljabar untuk SMP",
                    class_id: 1,
                    file_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("materials", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
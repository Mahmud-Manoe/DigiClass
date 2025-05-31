"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "file",
            [
                {
                    cloudinary_id: "file1_cloudinary",
                    link_pdf: "https://example.com/file1.pdf",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("file", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
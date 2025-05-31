"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "invitations",
            [
                {
                    invitation_code: "ABC123",
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("invitations", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
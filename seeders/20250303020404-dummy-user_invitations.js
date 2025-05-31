"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert(
            "user_invitations",
            [
                {
                    user_id: 2,
                    invitation_id: 1,
                    created_at: new Date(),
                    updated_at: new Date(),
                },
            ],
            {}
        );
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("user_invitations", null, {
            truncate: true,
            cascade: true,
            restartIdentity: true,
        });
    },
};
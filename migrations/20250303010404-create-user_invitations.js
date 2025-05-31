'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("user_invitations", {
            user_invitation_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "user_id",
                },
            },
            invitation_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "invitations",
                    key: "invitation_id",
                },
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user_invitations");
    },
};

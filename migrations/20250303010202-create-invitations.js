'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("invitations", {
            invitation_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            invitation_code: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable("invitations");
    },
};
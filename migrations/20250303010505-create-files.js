'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("file", {
            file_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            cloudinary_id: {
                type: Sequelize.STRING,
            },
            link_pdf: {
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
        await queryInterface.dropTable("file");
    },
};

'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("assignments", {
            assignment_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            assignment_name: {
                type: Sequelize.STRING,
            },
            assignment_conten: {
                type: Sequelize.TEXT,
            },
            class_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "classes",
                    key: "class_id",
                },
            },
            file_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "file",
                    key: "file_id",
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
        await queryInterface.dropTable("assignments");
    },
};

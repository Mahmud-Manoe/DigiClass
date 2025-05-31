'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("assignment_answers", {
            answer_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            assignment_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "assignments",
                    key: "assignment_id",
                },
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "users",
                    key: "user_id",
                },
            },
            file_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: "file",
                    key: "file_id",
                },
            },
            score: {
                type: Sequelize.INTEGER,
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
        await queryInterface.dropTable("assignment_answers");
    },
};

'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("question_bank", {
            bank_id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            question_type: {
                type: Sequelize.ENUM("PG", "PB", "BS", "I", "E", "M"),
            },
            question_content: {
                type: Sequelize.TEXT,
            },
            answer_option: {
                type: Sequelize.JSON,
            },
            correct_answer: {
                type: Sequelize.JSON,
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
        await queryInterface.dropTable("question_bank");
    },
};

"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class QuestionBank extends Model {
        static associate(models) {
            QuestionBank.hasMany(models.ExamQuestions, { foreignKey: "bank_id" });
        }
    }
    QuestionBank.init(
        {
            bank_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            question_type: DataTypes.ENUM("PG", "PB", "BS", "I", "E", "M"),
            question_content: DataTypes.TEXT,
            answer_option: DataTypes.JSON,
            correct_answer: DataTypes.JSON
        },
        {
            sequelize,
            modelName: "QuestionBank",
            tableName: "question_bank",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return QuestionBank;
};
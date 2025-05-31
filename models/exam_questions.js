"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ExamQuestions extends Model {
        static associate(models) {
            ExamQuestions.belongsTo(models.Exam, { 
                foreignKey: "exam_id",     
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
             });
            ExamQuestions.belongsTo(models.QuestionBank, { foreignKey: "bank_id", as: "bank" });
            ExamQuestions.hasMany(models.ExamAnswers, { 
                foreignKey: "questions_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
             });
        }
    }
    ExamQuestions.init(
        {
            questions_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            question_number: DataTypes.INTEGER,
            exam_id: DataTypes.INTEGER,
            bank_id: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "ExamQuestions",
            tableName: "exam_questions",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return ExamQuestions;
};
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ExamAnswers extends Model {
        static associate(models) {
            ExamAnswers.belongsTo(models.Users, { foreignKey: "users_id" });
            ExamAnswers.belongsTo(models.ExamQuestions, { 
                foreignKey: "questions_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
             });
        }
    }
    ExamAnswers.init(
        {
            answer_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            questions_id: DataTypes.INTEGER,
            users_id: DataTypes.INTEGER,
            student_answer: DataTypes.JSON,
            score: DataTypes.INTEGER,
            submitted_at: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "ExamAnswers", 
            tableName: "exam_answers",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return ExamAnswers;
};

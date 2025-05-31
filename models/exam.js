"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Exam extends Model {
        static associate(models) {
            Exam.belongsTo(models.Classes, { 
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
             });
            Exam.hasMany(models.ExamQuestions, { 
                foreignKey: "exam_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE", 
            });
        }
    }
    Exam.init(
        {
            exam_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            exam_name: DataTypes.STRING,
            exam_start: DataTypes.DATE,
            duration: DataTypes.INTEGER,
            class_id: DataTypes.INTEGER,
            status: DataTypes.ENUM("draft", "active", "finished"),
            type: DataTypes.ENUM("uh", "uts", "uas"), // field baru
        },
        {
            sequelize,
            modelName: "Exam",
            tableName: "exam",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return Exam;
};

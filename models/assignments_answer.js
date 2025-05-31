"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class AssignmentAnswer extends Model {
        static associate(models) {
            AssignmentAnswer.belongsTo(models.Users, { foreignKey: "user_id", as: "student" });
            AssignmentAnswer.belongsTo(models.Assignment, { 
                foreignKey: "assignment_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            AssignmentAnswer.belongsTo(models.File, { foreignKey: "file_id", as: "fileAssignmentAnswer" });
        }
    }
    AssignmentAnswer.init(
        {
            answer_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            file_id: DataTypes.INTEGER,
            assignment_id: DataTypes.INTEGER,
            score: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "AssignmentAnswer",
            tableName: "assignment_answers",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return AssignmentAnswer;
};
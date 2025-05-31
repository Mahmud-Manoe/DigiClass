"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Assignment extends Model {
        static associate(models) {
            Assignment.belongsTo(models.Classes, {
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Assignment.belongsTo(models.File, {
                foreignKey: "file_id", as: "fileAssignment"
            });
            Assignment.hasMany(models.AssignmentAnswer, {
                foreignKey: "assignment_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
        }
    }
    Assignment.init(
        {
            assignment_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            assignment_name: DataTypes.STRING,
            file_id: DataTypes.INTEGER,
            class_id: DataTypes.INTEGER,
            assignment_content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Assignment",
            tableName: "assignments",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Assignment;
};
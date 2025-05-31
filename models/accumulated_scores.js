"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class AccumulatedScore extends Model {
        static associate(models) {
            AccumulatedScore.belongsTo(models.Users, { foreignKey: "user_id" });
            AccumulatedScore.belongsTo(models.Classes, { 
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
             });
            AccumulatedScore.belongsTo(models.Users, { foreignKey: "user_id" });
            AccumulatedScore.hasMany(models.ScoreDetail, { foreignKey: "accumulated_score_id" });
        }
    }
    AccumulatedScore.init(
        {
            accumulated_score_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            class_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            total_assignment_score: DataTypes.INTEGER,
            total_exam_score: DataTypes.INTEGER,
            final_score: DataTypes.INTEGER,
            grade: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "AccumulatedScore",
            tableName: "accumulated_score",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return AccumulatedScore;
};
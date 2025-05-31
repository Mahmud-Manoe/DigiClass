"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class ScoreDetail extends Model {
        static associate(models) {
            ScoreDetail.belongsTo(models.AccumulatedScore, { foreignKey: "accumulated_score_id" });
        }
    }
    ScoreDetail.init(
        {
            score_detail_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            accumulated_score_id: DataTypes.INTEGER,
            type: DataTypes.ENUM("absen", "tugas", "ujian"),
            item_name: DataTypes.STRING,
            student_score: DataTypes.INTEGER,
            question_score: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "ScoreDetail",
            tableName: "score_detail",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return ScoreDetail;
};
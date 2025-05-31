"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Absen extends Model {
        static associate(models) {
            Absen.belongsTo(models.Classes, { 
                foreignKey: "class_id",
                onDelete: "CASCADE"
            });
            Absen.belongsTo(models.Users, { 
                foreignKey: "user_id",
                  onDelete: "CASCADE"
            });
        }
    }
    Absen.init(
        {
            absen_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            class_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            absen: DataTypes.BOOLEAN,
            total: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Absen",
            tableName: "absen",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return Absen;
};
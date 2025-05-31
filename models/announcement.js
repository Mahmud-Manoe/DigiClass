"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Announcement extends Model {
        static associate(models) {
            Announcement.belongsTo(models.Classes, { 
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            });
            Announcement.belongsTo(models.Users, { foreignKey: "user_id" });
        }
    }
    Announcement.init(
        {
            announcement_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            class_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Announcement",
            tableName: "announcement",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return Announcement;
};
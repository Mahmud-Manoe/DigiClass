"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class notification extends Model {
        static associate(models) {
            notification.belongsTo(models.Classes, { 
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE", 
            });
        }
    }
    notification.init(
        {
            notification_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            class_id: DataTypes.INTEGER,
            content: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Notification",
            tableName: "notification",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return notification;
};
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Materials extends Model {
        static associate(models) {
            Materials.belongsTo(models.Classes, { 
                foreignKey: "class_id", 
                onDelete: "CASCADE",
                onUpdate: "CASCADE",});
            Materials.belongsTo(models.File, { foreignKey: "file_id", as: "fileMateri" });
        }
    }
    Materials.init(
        {
            material_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            material_name: DataTypes.STRING,
            material_content: DataTypes.TEXT,
            class_id: DataTypes.INTEGER,
            file_id: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Materials",
            tableName: "materials",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return Materials;
};
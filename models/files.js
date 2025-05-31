"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class File extends Model {
        static associate(models) {
            File.hasMany(models.Assignment, { foreignKey: "file_id" });
            File.hasMany(models.AssignmentAnswer, { foreignKey: "file_id" });
            File.hasOne(models.Materials, { foreignKey: "file_id", as: "materialDetail" });
        }
    }
    File.init(
        {
            file_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            cloudinary_id: DataTypes.STRING,
            link_pdf: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "File",
            tableName: "file",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return File;
};
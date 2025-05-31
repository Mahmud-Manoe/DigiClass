"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Classes extends Model {
        static associate(models) {
            Classes.belongsTo(models.Users, { foreignKey: "user_id", as: "teacher" });
            Classes.belongsTo(models.Materials, { 
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
            Classes.belongsTo(models.Invitation, { foreignKey: "invitation_id", as: "invitation", });
            Classes.hasMany(models.Assignment, {
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
            Classes.hasMany(models.Exam, {
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
            Classes.hasMany(models.AccumulatedScore, {
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });

            Classes.hasMany(models.Absen, { foreignKey: "class_id" });
            Classes.hasMany(models.AttendanceSession, {
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
            Classes.hasMany(models.Announcement, {
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
            Classes.hasMany(models.Notification, {
                foreignKey: "class_id",
                onDelete: "CASCADE",
                onUpdate: "CASCADE"
            });
        }
    }
    Classes.init(
        {
            class_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            class_name: DataTypes.STRING,
            description: DataTypes.STRING,
            invitation_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            format_absen: DataTypes.ENUM("harian", "pertemuan"),
            format_nilai: DataTypes.ENUM("detail", "rekap"),
        },
        {
            sequelize,
            modelName: "Classes",
            tableName: "classes",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );

    return Classes;
};

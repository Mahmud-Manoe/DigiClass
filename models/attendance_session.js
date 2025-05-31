"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class AttendanceSession extends Model {
        static associate(models) {
            AttendanceSession.belongsTo(models.Classes, { foreignKey: "class_id" });
            AttendanceSession.hasMany(models.AttendanceRecord, {
                foreignKey: 'attendance_session_id',
                as: 'attendance_records', // gunakan alias
            });
        }
    }
    AttendanceSession.init(
        {
            attendance_session_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            class_id: DataTypes.INTEGER,
            attendance_type:  DataTypes.ENUM("harian", "pertemuan"),
            date: DataTypes.INTEGER,
            meeting_topic: DataTypes.STRING,
            meeting_number: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "AttendanceSession",
            tableName: "attendance_session",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return AttendanceSession;
};
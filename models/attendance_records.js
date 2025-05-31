"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class AttendanceRecord extends Model {
        static associate(models) {
            AttendanceRecord.belongsTo(models.AttendanceSession, { foreignKey: "attendance_session_id" });
            AttendanceRecord.belongsTo(models.Users, { foreignKey: "user_id" });
        }
    }
    AttendanceRecord.init(
        {
            attendance_records_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            attendance_session_id: DataTypes.INTEGER,
            user_id: DataTypes.INTEGER,
            status:  DataTypes.ENUM("hadir", "sakit", "izin", "alpa"),
        },
        {
            sequelize,
            modelName: "AttendanceRecord",
            tableName:"attendance_records",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return AttendanceRecord;
};
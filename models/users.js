"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        static associate(models) {
            Users.hasMany(models.Classes, { foreignKey: "user_id" });
            Users.hasMany(models.UserInvitation, { foreignKey: "user_id", as: "userInvitations" });
            Users.hasMany(models.AssignmentAnswer, { foreignKey: "user_id" });
            Users.hasMany(models.ExamAnswers, { foreignKey: "users_id" });
            Users.hasMany(models.AccumulatedScore, { foreignKey: "user_id" });
        }
    }
    Users.init(
        {
            user_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.ENUM("guru", "siswa"),
        },
        {
            sequelize,
            modelName: "Users",
            tableName: "users",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    return Users;
};

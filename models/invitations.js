"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Invitation extends Model {
        static associate(models) {
            Invitation.hasOne(models.Classes, { foreignKey: "invitation_id", as : "classInfo" });
            Invitation.hasMany(models.UserInvitation, { foreignKey: "invitation_id" });
        }
    }
    Invitation.init(
        {
            invitation_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            invitation_code: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Invitation",
            tableName: "invitations",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return Invitation;
};

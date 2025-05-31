// "use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserInvitation extends Model {
        static associate(models) {
            UserInvitation.belongsTo(models.Users, { foreignKey: "user_id", as: "user" });
            UserInvitation.belongsTo(models.Invitation, { foreignKey: "invitation_id", as : "invitation" });
        }
    }
    UserInvitation.init(
        {
            user_invitation_id: {
                type: DataTypes.INTEGER,
                primaryKey: true, // Menandai sebagai primary key
                autoIncrement: true,
            },
            user_id: DataTypes.INTEGER,
            invitation_id: DataTypes.STRING
        },
        {
            sequelize,
            modelName: "UserInvitation",
            tableName: "user_invitations",
            underscored: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    );
    
    return UserInvitation;
};

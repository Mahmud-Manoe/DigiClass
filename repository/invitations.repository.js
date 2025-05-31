const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class InvitationRepository {
    async getAll() {
        try {
            return await models.Invitation.findAll();
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            return await models.Invitation.findOne({
                where: { invitation_id : id },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            return await models.Invitation.create(data);
        } catch (err) {
            
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.Invitation.update(data, { where: { id } });
            return await this.getOneById(id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteInvitation(id) {
        try {
            await models.Invitation.destroy({ where: { id } });
            return `Invitation with id ${id} deleted successfully`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new InvitationRepository();
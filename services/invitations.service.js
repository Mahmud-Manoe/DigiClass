const InvitationRepository = require("../repository/invitations.repository.js");
const { NotFound } = require("../utils/response.js");

class InvitationService {
    async getAll() {
        return await InvitationRepository.getAll();
    }

    async getOneById(id) {
        const invitation = await InvitationRepository.getOneById(id);
        if (!invitation) {
            throw new NotFound("Invitation not found");
        }
        return invitation;
    }

    async createInvitation(data) {
        return await InvitationRepository.store(data);
    }

    async updateInvitation(id, data) {
        const isExists = await InvitationRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Invitation not found");
        }
        return await InvitationRepository.update(id, data);
    }

    async deleteInvitation(id) {
        const isExists = await InvitationRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Invitation not found");
        }
        return await InvitationRepository.deleteInvitation(id);
    }
}

module.exports = new InvitationService();
const InvitationService = require("../../../services/invitations.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class InvitationController {
    async getInvitations(req, res) {
        try {
            const data = await InvitationService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getInvitationsById(req, res) {
        try {
            const id = req.params.id;
            const data = await InvitationService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createInvitations(req, res) {
        try {
            const data = await InvitationService.createInvitation(req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateInvitationsById(req, res) {
        try {
            const id = req.params.id;
            const data = await InvitationService.updateInvitation(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteInvitations(req, res) {
        try {
            const id = req.params.id;
            await InvitationService.deleteInvitation(id);
            return SuccessFetchResponse(res, { message: `Invitation with id ${id} deleted successfully` });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new InvitationController();
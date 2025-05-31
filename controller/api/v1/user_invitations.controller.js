const { INTEGER } = require("sequelize");
const UserInvitationsService = require("../../../services/user_invitations.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class UserInvitationsController {
    async getUserInvitations(req, res) {
        try {
            const data = await UserInvitationsService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
    async getStudent(req, res) {
        try {
            const classId = req.params.classId;
            const data = await UserInvitationsService.getStudent(classId);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
    
    async getUserInvitationsById(req, res) {
        try {
            const id = req.params.id;
            const data = await UserInvitationsService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async joinClass(req, res) {
        try {
            const { user_id } = req.user;
            const data = await UserInvitationsService.joinClass(user_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createUserInvitations(req, res) {
        try {
            const data = await UserInvitationsService.createUserInvitations(req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateUserInvitationsById(req, res) {
        try {
            const id = req.params.id;
            const data = await UserInvitationsService.updateUserInvitations(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
    
    async kickStudent(req, res) {
        try {
            const class_id = req.query.class_id;
            const user_id = req.params.userId;
            
            const data = await UserInvitationsService.deleteUserInvitations(class_id, user_id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
    async deleteUserInvitations(req, res) {
        try {
            const class_id = parseInt(req.params.classId);
            const user_id = req.user.user_id;
            
            const data = await UserInvitationsService.deleteUserInvitations(class_id, user_id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new UserInvitationsController();
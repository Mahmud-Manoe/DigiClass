const AssignmentsService = require("../../../services/assignments.service.js");
const NotificationService = require("../../../services/notification.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");
const { emitNotification } = require('../../../config/socket.js');
const notification = require("../../../models/notification.js");


class AssignmentsController {
    async getAssignments(req, res) {
        try {
            const data = await AssignmentsService.getAssignments();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAssignmentsById(req, res) {
        try {
            const id = req.params.id;
            const data = await AssignmentsService.getAssignmentsById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAssignmentsByClassId(req, res) {
        try {
            const id = req.params.id;
            const data = await AssignmentsService.getAssignmentsByClassId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createAssignments(req, res) {
        try {
            const id = req.query.class_id;
            const data = await AssignmentsService.createAssignments(id, req.body);
            
            const notification = await NotificationService.createNotification(id, {content: data.assignment_content});
            emitNotification(id, {content: notification.content});
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async updateAssignmentsById(req, res) {
        try {
            const assignments_id = req.params.id;
            const data = await AssignmentsService.updateAssignmentsById(assignments_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async deleteAssignments(req, res) {
        try {
            const id = req.params.id;
            const data = await AssignmentsService.deleteAssignments(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new AssignmentsController();

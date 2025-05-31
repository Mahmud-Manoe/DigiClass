const AssignmentsAnswerService = require("../../../services/assignments_answer.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class AssignmentsAnswerController {
    async getAllAssignmentsAnswer(req, res) {
        try {
            const data = await AssignmentsAnswerService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    } //not used

    async getAssignmentsAnswer(req, res) {
        try {
            const {user_id} = req.user
            const {assignment_id} = req.query
            const data = await AssignmentsAnswerService.getAssignmentsAnswer(user_id, assignment_id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getAssignmentsAnswerById(req, res) {
        try {
            const id = req.params.id;
            const data = await AssignmentsAnswerService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getAssignmentsAnswerByAssignmentId(req, res) {
        try {
            const id = req.params.id;
            const data = await AssignmentsAnswerService.getAllByAssignmentId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    
    async createAssignmentsAnswer(req, res) {
        try {
            const { user_id } = req.user
            const {assignment_id} = req.query
            const data = await AssignmentsAnswerService.createAssignmentsAnswer(user_id, assignment_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        } 
    }

    async updateAssignmentsAnswerById(req, res) {
        try {
            const id = req.params.id;
            const data = await AssignmentsAnswerService.updateAssignmentsAnswerById(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteAssignmentsAnswer(req, res) {
        try {
            const id = req.params.id;
            const data = await AssignmentsAnswerService.deleteAssignmentsAnswer(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new AssignmentsAnswerController();

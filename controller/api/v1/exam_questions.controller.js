const ExamQuestionsService = require("../../../services/exam_questions.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class ExamQuestionsController {
    async getExamQuestions(req, res) {
        try {
            const data = await ExamQuestionsService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getExamQuestionsById(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamQuestionsService.getExamQuestionsById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getExamQuestionsByExamId(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamQuestionsService.getExamQuestionsByExamId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getExamQuestionsStudentByExamId(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamQuestionsService.getExamQuestionsStudentByExamId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async createExamQuestions(req, res) {
        try {
            const exam_id = req.query.exam_id;
            const data = await ExamQuestionsService.createExamQuestions(exam_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async updateExamQuestionsById(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamQuestionsService.updateExamQuestionsById(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    
    async updateExamScore(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamQuestionsService.updateExamScore(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteExamQuestions(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamQuestionsService.deleteExamQuestions(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new ExamQuestionsController();

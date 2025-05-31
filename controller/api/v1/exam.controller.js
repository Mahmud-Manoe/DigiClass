const { logger } = require("sequelize/lib/utils/logger");
const ExamService = require("../../../services/exam.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class ExamController {
    async getExams(req, res) {
        try {
            const data = await ExamService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getExamsById(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
    async getExamsByClassId(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamService.getAllByClassId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async gradeExamAnswers(req, res) {
        try {
            const {examId} = req.params;
            const data = await ExamService.gradeExamAnswers(examId);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createExams(req, res) {
        try {
            const class_id = req.query.class_id;
            const data = await ExamService.createExam(class_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateExamsById(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamService.updateExam(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteExams(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamService.deleteExam(id);
            return SuccessFetchResponse(res, data);     
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new ExamController();
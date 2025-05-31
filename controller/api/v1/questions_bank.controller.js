const QuestionsBankService = require("../../../services/questions_bank.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class QuestionsBankController {
    async getQuestionsBank(req, res) {
        try {
            const data = await QuestionsBankService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getQuestionsBankById(req, res) {
        try {
            const id = req.params.id;
            const data = await QuestionsBankService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createQuestionsBank(req, res) {
        try {
            const data = await QuestionsBankService.createQuestionsBank(req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateQuestionsBankById(req, res) {
        try {
            const id = req.params.id;
            const data = await QuestionsBankService.updateQuestionsBank(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteQuestionsBank(req, res) {
        try {
            const id = req.params.id;
            await QuestionsBankService.deleteQuestionsBank(id);
            return SuccessFetchResponse(res, { message: `Questions Bank with id ${id} deleted successfully` });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new QuestionsBankController();
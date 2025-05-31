const QuestionsBankRepository = require("../repository/questions_bank.repository.js");
const { NotFound } = require("../utils/response.js");

class QuestionsBankService {
    async getAll() {
        return await QuestionsBankRepository.getAll();
    }

    async getOneById(id) {
        const questionsBank = await QuestionsBankRepository.getOneById(id);
        if (!questionsBank) {
            throw new NotFound("Questions Bank not found");
        }
        return questionsBank;
    }

    async createQuestionsBank(data) {
        return await QuestionsBankRepository.store(data);
    }

    async updateQuestionsBank(id, data) {
        const isExists = await QuestionsBankRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await QuestionsBankRepository.update(id, data);
    }

    async deleteQuestionsBank(id) {
        const isExists = await QuestionsBankRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await QuestionsBankRepository.deleteQuestionsBank(id);
    }
}

module.exports = new QuestionsBankService();
const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class QuestionsBankRepository {
    async getAll() {
        try {
            return await models.QuestionBank.findAll({});
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(bank_id) {
        try {
            return await models.QuestionBank.findOne({
                where: {bank_id}
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            return await models.QuestionBank.create(data);
        } catch (err) {
            
            throw new InternalServerError();
        }
    }

    async update(bank_id, data) {
        try {
            await models.QuestionBank.update(data, { where: { bank_id} });
            return await this.getOneById(bank_id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteQuestionsBank(bank_id) {
        try {
            await models.QuestionBank.destroy({ where: { bank_id } });
            return `Questions Bank with id ${bank_id} deleted successfully`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new QuestionsBankRepository();
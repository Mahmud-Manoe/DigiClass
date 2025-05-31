const { where } = require("sequelize");
const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class ExamQuestionsRepository {
  async getAll() {
    try {
      const exam_question = await models.ExamQuestions.findAll({});
      return exam_question;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async getOneById(id) {
    try {
      const exam_question = await models.ExamQuestions.findOne({
        where: { questions_id: id },
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });
      return exam_question;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getAllByExamId(id) {
    try {
      const exam_question = await models.ExamQuestions.findAll({
        where: { exam_id: id },
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
        include: [
          {
            model: models.QuestionBank,
            as: "bank",
          }
        ]
      });
      return exam_question;
    } catch (err) {
      throw new InternalServerError();
    }
  }

    async getAllByExamIdStudent(id) {
    try {
      const exam_question = await models.ExamQuestions.findAll({
        where: { exam_id: id },
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
        include: [
          {
            model: models.QuestionBank,
            as: "bank",
          }
        ],
        exclude: ["correct_answer"]

      });
      return exam_question;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async count(exam_id) {
    try {
      return await models.ExamQuestions.count({
        where: { exam_id }
      });
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async store(data) {
    try {
      const question = await models.ExamQuestions.create(data);
      return await models.ExamQuestions.findOne({
        where: {
          questions_id: question.questions_id
        },
        include: [
          {
            model: models.Exam,
          },
          {
            model: models.QuestionBank,
            as: "bank"
          }
        ]
      });
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async update(questions_id, data) {

    try {
      const question = await models.ExamQuestions.update(data, { where: { questions_id } });
      return await models.ExamQuestions.findOne({
        where: {
          questions_id
        },
        include: [
          {
            model: models.QuestionBank,
            as: "bank"
          }
        ]
      });
      return
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async deleteExamQuestions(questions_id) {
    try {
      models.ExamQuestions.destroy({
        where: { questions_id },
      });
      return { id: parseInt(questions_id) };
    } catch (err) {
      throw new InternalServerError();
    }
  }
}
module.exports = new ExamQuestionsRepository();

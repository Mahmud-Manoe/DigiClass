const e = require("express");
const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class ExamRepository {
    async getAll() {
        try {
            return await models.Exam.findAll({
                attributes: { exclude: ["createdAt", "updatedAt"] },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            return await models.Exam.findOne({
                where: { exam_id: id },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByClassId(id) {
        try {
            return await models.Exam.findAll({
                where: { class_id: id },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getAnswersByExamId(examId) {
        try {
            return models.ExamAnswers.findAll({
                include: {
                    model: models.ExamQuestions,
                    where: { exam_id: examId },
                    include: {
                        model: models.QuestionBank,
                        as: 'bank', // alias sesuai relasi
                    },
                },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    };

    async getOneByName(exam_name) {
        try {
            const kelas = await models.Exam.findOne({
                where: { exam_name },
            });

            return kelas;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const exam = await models.Exam.create(data);
            const exam2 = await models.Exam.findOne({
                where: {
                    exam_id: exam.exam_id,
                },
            });
            return exam2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.Exam.update(data, { where: { exam_id: id } });
            return await this.getOneById(id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async updateAnswerScore(answerId, score) {
        try {
            await models.ExamAnswers.update(
                { score },
                { where: { answer_id: answerId } }

            );
            return await this.getOneById(answerId);
        } catch (err) {
            throw new InternalServerError();
        }
    };

    async deleteExam(id) {
        try {
            await models.Exam.destroy({ where: { exam_id: id } });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new ExamRepository();
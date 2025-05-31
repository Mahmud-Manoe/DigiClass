const models = require("../models/index");
const { Op, or, where } = require("sequelize");

const { InternalServerError } = require("../utils/response.js");

class ExamAnswersRepository {
    async getAll() {
        try {
            const question = await models.ExamAnswers.findAll({});
            return question;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            return await models.ExamAnswers.findOne({
                where: { answer_id: id },
                include: [
                    {
                        model: models.Users,
                    },
                    {
                        model: models.ExamQuestions,
                        include: [
                            {
                                model: models.QuestionBank,
                                as: "bank"
                            }
                        ]
                    }
                ]
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getEOneByQuestionId(questions_id, users_id) {
        try {
            return await models.ExamAnswers.findAll({
                where: { questions_id, users_id },

            });

        } catch (err) {
            throw new InternalServerError();
        }
    }


    async getAnswersByExamIdWithDetails(examId, users_id) {
        try {
        return await models.ExamAnswers.findAll({
            where: { users_id },
            include: [
                {
                    model: models.Users,
                    attributes: ['user_id', 'name']
                },
                {
                    model: models.ExamQuestions,
                    where: { exam_id: examId },
                    attributes: ['questions_id', 'question_number', 'score'],
                    include: {
                        model: models.QuestionBank,
                        as: 'bank',
                        attributes: ['question_type', "question_content", 'correct_answer']
                    }
                }
            ]
        });
            
        } catch (error) {
            throw new InternalServerError();
        }
    };
    async store(data) {
        try {
            const answer = await models.ExamAnswers.create(data);
            const answer2 = await models.ExamAnswers.findOne({
                where: {
                    answer_id: answer.answer_id,
                },
            });
            return answer2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(answer_id, data) {
        try {
            await models.ExamAnswers.update(data, { where: { answer_id } });
            return await models.ExamAnswers.findOne({
                where: {
                    answer_id,
                },
            });

        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteByAchievement(id) {
        try {
            models.questions.destroy({
                where: { achievements_id: id, },
            });
            return `${id} berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteByAchievementId(id) {
        try {
            const iden = id.map(e => e.id)
            models.questions.destroy({
                where: {
                    [Op.or]: [{
                        achievements_id: iden
                    }]
                },
                raw: true,
                nest: true,
            });
            return `berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async deleteByOneAchievementId(id) {
        try {
            models.questions.destroy({
                where: { achievements_id: id, },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteQuestion(id) {
        try {
            models.questions.destroy({
                where: { id, },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new ExamAnswersRepository();

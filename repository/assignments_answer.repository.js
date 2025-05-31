const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AssignmentsAnswerRespository {
    async getAll() {
        try {
            const answer = await models.AssignmentAnswer.findAll({
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return answer;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAnswer(user_id, assignment_id) {
        console.log(user_id, assignment_id);

        try {
            const answer = await models.AssignmentAnswer.findOne({
                where: {
                    user_id: user_id,
                    assignment_id: parseInt(assignment_id)
                },
                include: [
                    {
                        model: models.File,
                        as: "fileAssignmentAnswer"
                    }
                ]
            });
            return answer;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAnswerByAssignment(assignment_id) {
        console.log(assignment_id);

        try {
            const answer = await models.AssignmentAnswer.findAll({
                where: {
                    assignment_id: parseInt(assignment_id)
                },
                include: [
                    {
                        model: models.File,
                        as: "fileAssignmentAnswer"
                    },
                    {
                        model: models.Users,
                        as: "student"
                    }
                ]
            });
            return answer;
        } catch (err) {

            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const answer = await models.AssignmentAnswer.findOne({
                where: { answer_id: id },
                include:[
                    {
                        model: models.Assignment
                    }
                ]

            });
            return answer;
        } catch (err) {
            console.log(err);

            throw new InternalServerError();
        }
    }
    async getAllByUser(id) {
        try {
            const answer = await models.AssignmentAnswer.findAll({
                where: { users_id: id },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return answer;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getByQuestion(id) {
        try {
            const answer = await models.AssignmentAnswer.findAll({
                where: {
                    questions_id: id
                },
                attributes: {
                    exclude: ["updatedAt", "createdAt"],
                },
            });
            return answer;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const answer = await models.AssignmentAnswer.create(data);
            const answer2 = await models.AssignmentAnswer.findOne({
                where: {
                    answer_id: answer.answer_id,
                },
            });
            return answer2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.AssignmentAnswer.update(data, { where: { answer_id: id } });
            const answer = await models.AssignmentAnswer.findOne({
                where: {
                    answer_id: id,
                },
            });
            return answer;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAnswer(id) {
        try {
            models.AssignmentAnswer.destroy({
                where: { id, },
            });
            return `data answers dngan id ${id} berhasil di hpus`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new AssignmentsAnswerRespository();

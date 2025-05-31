const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AssignmentsRepository {
    async getAll() {
        try {
            const assignment = await models.Assignment.findAll({});
            return assignment;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const assignment = await models.Assignment.findOne({
                where: { assignment_id: id },
                include: [
                    {
                        model: models.File,
                        as: "fileAssignment"
                    }
                ]
            });
            return assignment;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByClassId(id) {
        try {
            const material = await models.Assignment.findAll({
                where: { class_id: id },
                include: [
                    {
                        model: models.File,
                        as: "fileAssignment"
                    },
                ],
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async store(data) {
        try {
            const assignment = await models.Assignment.create(data);
            const assignment2 = await models.Assignment.findOne({
                where: {
                    assignment_id: assignment.assignment_id,
                },
                include: [
                    {
                        model: models.Classes,
                    },
                ],
            });
            return assignment2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.Assignment.update(data, { where: { assignment_id: id } });
            const assignment = await models.Assignment.findOne({
                where: {
                    assignment_id: id,
                },
            });
            return assignment;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAssignment(id) {
        try {
            models.Assignment.destroy({
                where: { assignment_id: id },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new AssignmentsRepository();
 
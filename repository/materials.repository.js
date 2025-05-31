const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class MaterialRepository {
    async getAll() {
        try {
            const material = await models.Materials.findAll({});
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const material = await models.Materials.findOne({
                where: { material_id: id },
                include: [
                    {
                        model: models.File,
                        as: "fileMateri"
                    }
                ]
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByClassId(id) {
        try {
            const material = await models.Materials.findAll({
                where: { class_id: id },
                include: [
                    {
                        model: models.File,
                        as: "fileMateri"
                    },
                ],
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getOneByClassId(id) {
        try {
            const material = await models.Materials.findOne({
                where: { class_id: id },
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            const material = await models.Materials.create(data);
            const material2 = await models.Materials.findOne({
                where: {
                    material_id: material.material_id,
                },
                include: [
                    {
                        model: models.Classes,
                    },
                ],
            });
            return material2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.Materials.update(data, { where: { material_id: id } });
            const material = await models.Materials.findOne({
                where: {
                    material_id: id,
                },
            });
            return material;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteMaterial(id) {
        try {
            models.Materials.destroy({
                where: { material_id: id, },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new MaterialRepository();

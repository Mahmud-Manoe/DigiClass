const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AbsenRepository {
    async getAll() {
        try {
            return await models.Absen.findAll({});
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(absen_id) {
        try {
            return await models.Absen.findOne({
                where: {absen_id}
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            return await models.Absen.create(data);
        } catch (err) {
            
            throw new InternalServerError();
        }
    }

    async update(absen_id, data) {
        try {
            await models.Absen.update(data, { where: { absen_id} });
            return await this.getOneById(absen_id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAbsen(absen_id) {
        try {
            await models.Absen.destroy({ where: { absen_id } });
            return `Questions absen with id ${absen_id} deleted successfully`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new AbsenRepository();
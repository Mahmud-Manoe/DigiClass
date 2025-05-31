const AbsenRepository = require("../repository/absen.repository");
const { NotFound } = require("../utils/response.js");

class AbsenService {
    async getAll() {
        return await AbsenRepository.getAll();
    }

    async getOneById(id) {
        const absen = await AbsenRepository.getOneById(id);
        if (!absen) {
            throw new NotFound("Questions Bank not found");
        }
        return absen;
    }

    async createAbsen(data) {
        const {absen} = data;
        return await AbsenRepository.store({
            absen,
            total,
        });
    }

    async updateAbsen(id, data) {
        const isExists = await AbsenRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await AbsenRepository.update(id, data);
    }

    async deleteAbsen(id) {
        const isExists = await AbsenRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await AbsenRepository.deleteAbsen(id);
    }
}

module.exports = new AbsenService();
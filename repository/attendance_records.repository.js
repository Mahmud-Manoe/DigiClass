const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AttendanceRecordsRepository {
    async getAll() {
        try {
            return await models.AttendanceRecord.findAll({});
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(absen_id) {
        try {
            return await models.AttendanceRecord.findOne({
                where: { absen_id }
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getAllByClassId(class_id, attendance_records_id) {
        try {
            return await models.AttendanceRecord.findOne({
                where: { class_id, attendance_records_id },
                include: [
                    {
                        model: models.AttendanceSession
                    }
                ]
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            return await models.AttendanceRecord.create(data);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(absen_id, data) {
        try {
            await models.AttendanceRecord.update(data, { where: { absen_id } });
            return await this.getOneById(absen_id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAbsen(absen_id) {
        try {
            await models.AttendanceRecord.destroy({ where: { absen_id } });
            return `Questions absen with id ${absen_id} deleted successfully`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new AttendanceRecordsRepository();
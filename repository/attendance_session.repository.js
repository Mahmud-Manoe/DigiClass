const e = require("express");
const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AbsenRepository {
    async getAll() {
        try {
            return await models.AttendanceSession.findAll({});
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(absen_id) {
        try {
            return await models.AttendanceSession.findOne({
                where: {absen_id}
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByClassId(class_id, type) {
        try {
            return await models.AttendanceSession.findAll({
                where: {class_id, attendance_type: type},
                include: [
                    {
                        model: models.AttendanceRecord,
                        as: "attendance_records"
                    }
                ]
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {            
            return await models.AttendanceSession.create(data);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(absen_id, data) {
        try {
            await models.AttendanceSession.update(data, { where: { absen_id} });
            return await this.getOneById(absen_id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAbsen(absen_id) {
        try {
            await models.AttendanceSession.destroy({ where: { absen_id } });
            return `Questions absen with id ${absen_id} deleted successfully`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new AbsenRepository();
const AttendanceRecordsRepository = require("../repository/attendance_records.repository.js");
const { NotFound } = require("../utils/response.js");

class AttendanceRecordsService {
/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Fetches all attendance records from the repository.
     * 
     * @returns {Promise<Array>} A promise that resolves to an array of attendance records.
     * @throws {InternalServerError} If there's an error fetching the records.
     */

/*******  268fbf5d-3f20-439b-b453-f09004793388  *******/    async getAll() {
        return await AttendanceRecordsRepository.getAll();
    }

    async getOneById(id) {
        const absen = await AttendanceRecordsRepository.getOneById(id);
        if (!absen) {
            throw new NotFound("Questions Bank not found");
        }
        return absen;
    }
    async getAllByClassId(id, format) {
        const absen = await AttendanceRecordsRepository.getAllByClassId(id, format);
        if (!absen) {
            throw new NotFound("Questions Bank not found");
        }
        return absen;
    }

    async createAttendanceRecords(data) {
        const {absen} = data;
        return await AttendanceRecordsRepository.store({
            absen,
            total,
        });
    }

    async updateAttendanceRecords(id, data) {
        const isExists = await AttendanceRecordsRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await AttendanceRecordsRepository.update(id, data);
    }

    async deleteAttendanceRecords(id) {
        const isExists = await AttendanceRecordsRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await AttendanceRecordsRepository.deleteAttendanceRecords(id);
    }
}

module.exports = new AttendanceRecordsService();
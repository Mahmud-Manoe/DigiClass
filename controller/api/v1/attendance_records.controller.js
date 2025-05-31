const AttendanceRecordsService = require("../../../services/attendance_records.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class AttendanceRecordsController {
    async getAttendanceRecords(req, res) {
        try {
            const data = await AttendanceRecordsService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getAttendanceRecordsById(req, res) {
        try {
            const id = req.params.id;
            const data = await AttendanceRecordsService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
    async getAttendanceRecordsByClassId(req, res) {
        try {
            const id = req.params.id;
            const format = req.params.format;
            const data = await AttendanceRecordsService.getAllByClassId(id, format);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createAttendanceRecords(req, res) {
        try {
            const data = await AttendanceRecordsService.createAttendanceRecords(req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateAttendanceRecordsById(req, res) {
        try {
            const id = req.params.id;
            const data = await AttendanceRecordsService.updateAttendanceRecords(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteAttendanceRecords(req, res) {
        try {
            const id = req.params.id;
            await AttendanceRecordsService.deleteAttendanceRecords(id);
            return SuccessFetchResponse(res, { message: `Questions Bank with id ${id} deleted successfully` });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new AttendanceRecordsController();
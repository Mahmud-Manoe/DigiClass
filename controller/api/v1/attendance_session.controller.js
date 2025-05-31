const AttendanceSessionService = require("../../../services/attendance_session.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class AttendanceSessionsController {
    async getAttendanceSessions(req, res) {
        try {
            const data = await AttendanceSessionService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getAttendanceSessionsById(req, res) {
        try {
            const class_id = req.params.classId;
            const type = req.params.type;
            const data = await AttendanceSessionService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getAttendanceSessionsByClassId(req, res) {
        try {
            const class_id = req.params.classId;
            const type = req.params.type;
            const data = await AttendanceSessionService.getAttendanceSessionsByClassId(class_id, type);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createAttendanceSessions(req, res) {
        try {
            const class_id = req.query.class_id;            
            const data = await AttendanceSessionService.createAttendanceSessions(class_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateAttendanceSessionsById(req, res) {
        try {
            const id = req.params.id;
            const data = await AttendanceSessionService.updateAttendanceSessions(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteAttendanceSessions(req, res) {
        try {
            const id = req.params.id;
            await AttendanceSessionService.deleteAttendanceSessions(id);
            return SuccessFetchResponse(res, { message: `Questions Bank with id ${id} deleted successfully` });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new AttendanceSessionsController();
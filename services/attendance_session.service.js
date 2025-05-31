const AttendanceSessionRepository = require("../repository/attendance_session.repository.js");
const AttendanceRecordsRepository = require("../repository/attendance_records.repository.js");
const ClassesRepository = require("../repository/classes.repository.js");
const Accumulated_scoresRepository = require("../repository/accumulated_scores.repository.js");
const ScoreDetailRepository = require("../repository/score.repository.js");
const { NotFound } = require("../utils/response.js");

class AttendanceSessionService {
    async getAll() {
        return await AttendanceSessionRepository.getAll();
    }

    async getOneById(id) {
        const absen = await AttendanceSessionRepository.getOneById(id);
        if (!absen) {
            throw new NotFound("Questions Bank not found");
        }
        return absen;
    }
    async getAttendanceSessionsByClassId(class_id, type) {
        const absen = await AttendanceSessionRepository.getAllByClassId(class_id, type);
        if (!absen) {
            throw new NotFound("Questions Bank not found");
        }
        return absen;
    }

    async createAttendanceSessions(class_id, data) {
        const { date, meeting_topic, absen } = data;
        const classes = await ClassesRepository.getOneById(class_id);

        if (!classes) {
            throw new NotFound("Questions Bank not found");
        }

        const meeting = await AttendanceSessionRepository.getAllByClassId(class_id, classes.format_absen);

        const attendanceSession = await AttendanceSessionRepository.store({
            class_id: parseInt(class_id),
            attendance_type: classes.format_absen,
            date: parseInt(date),
            meeting_topic,
            meeting_number: meeting.length + 1
        });

        // Mapping status absen ke nilai
        const statusToScore = {
            hadir: 100,
            izin: 100,
            sakit: 100,
            alfa: 0
        };

        await Promise.all(absen.map(async (record) => {
            AttendanceRecordsRepository.store({
                attendance_session_id: attendanceSession.attendance_session_id,
                user_id: record.user_id,
                status: record.status,
            }),
                await ScoreDetailRepository.store({
                    accumulated_score_id: (await Accumulated_scoresRepository.getAccumulated(class_id, record.user_id))[0].accumulated_score_id,
                    type: 'absen',
                    item_name: `Pertemuan ${meeting.length + 1}: ${meeting_topic}`,
                    student_score: statusToScore[record.status] ?? 0,
                    question_score: 100
                });
        }));
        return attendanceSession;
    }

    async updateAttendanceSessions(sid, data) {
        const isExists = await AttendanceSessionRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await AttendanceSessionRepository.update(id, data);
    }

    async deleteAttendanceSessions(id) {
        const isExists = await AttendanceSessionRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await AttendanceSessionRepository.deleteAttendanceSession(id);
    }
}

module.exports = new AttendanceSessionService();
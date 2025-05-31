const AnnouncementService = require("../../../services/announcement.service.js");
const NotificationService = require("../../../services/notification.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");
const { emitAnnouncement, emitUpdateAnnouncement } = require('../../../config/socket.js');

class AnnouncementController {
    async getAnnouncement(req, res) {
        try {
            const data = await AnnouncementService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getAnnouncementById(req, res) {
        try {
            const id = req.params.id;
            const data = await AnnouncementService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getAnnouncementByClassId(req, res) {
        try {
            const id = req.params.id;
            const data = await AnnouncementService.getAllByClassId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createAnnouncement(req, res) {
        try {
            const id = req.query.class_id;
            const {user_id} = req.user
            const data = await AnnouncementService.createAnnouncement(id, user_id, req.body);
            // const notification = await NotificationService.createNotification(id, req.body);
            emitAnnouncement(id, data);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateAnnouncementById(req, res) {
        try {
            const id = req.params.id;
            const data = await AnnouncementService.updateAnnouncement(id, req.body);
            emitUpdateAnnouncement(data.class_id, data);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteAnnouncement(req, res) {
        try {
            const id = req.params.id;
            await AnnouncementService.deleteAnnouncement(id);
            return SuccessFetchResponse(res, { message: `Announcement with id ${id} deleted successfully`, id });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new AnnouncementController();
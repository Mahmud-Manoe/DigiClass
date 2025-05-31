const NotificationService = require("../../../services/notification.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class NotificationController {
    async getNotification(req, res) {
        try {
            const data = await NotificationService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getNotificationById(req, res) {
        try {
            const id = req.params.id;
            const data = await NotificationService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
    async getNotificationByClassId(req, res) {
        try {
            const id = req.params.id;
            const data = await NotificationService.getAllByClassId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createNotification(req, res) {

        try {
            const class_id = req.query.class_id;
            const data = await NotificationService.createNotification(class_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateNotificationById(req, res) {
        try {
            const id = req.params.id;
            const data = await NotificationService.updateNotification(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteNotification(req, res) {
        try {
            const id = req.params.id;
            await NotificationService.deleteNotification(id);
            return SuccessFetchResponse(res, { message: `Questions Bank with id ${id} deleted successfully` });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new NotificationController();
const NotificationRepository = require("../repository/notification.repository.js");
const { NotFound } = require("../utils/response.js");

class NotificationService {
    async getAll() {
        return await NotificationRepository.getAll();
    }

    async getOneById(id) {
        const Notification = await NotificationRepository.getOneById(id);
        if (!Notification) {
            throw new NotFound("Questions Bank not found");
        }
        return Notification;
    }
    async getAllByClassId(id) {
        const Notification = await NotificationRepository.getAllByClassId(id);
        if (!Notification) {
            throw new NotFound("Questions Bank not found");
        }
        return Notification;
    }

    async createNotification(class_id, data) {
        const {content } = data
        return await NotificationRepository.store({
            class_id,
            content
        });
    }

    async updateNotification(id, data) {
        const isExists = await NotificationRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await NotificationRepository.update(id, data);
    }

    async deleteNotification(id) {
        const isExists = await NotificationRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await NotificationRepository.deleteNotification(id);
    }
}

module.exports = new NotificationService();
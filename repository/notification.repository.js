const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class NotificationRepository {
    async getAll() {
        try {
            return await models.Notification.findAll({});
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(notification_id) {
        try {
            return await models.Notification.findOne({
                where: {notification_id}
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByClassId(class_id) {
        try {
            return await models.Notification.findAll({
                where: {class_id},
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            return await models.Notification.create(data);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(notification_id, data) {
        try {
            await models.Notification.update(data, { where: { notification_id} });
            return await this.getOneById(notification_id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteNotification(notification_id) {
        try {
            await models.Notification.destroy({ where: { notification_id } });
            return `Questions Bank with id ${notification_id} deleted successfully`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new NotificationRepository();
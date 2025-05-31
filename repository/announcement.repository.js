const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AnnouncementRepository {
    async getAll() {
        try {
            return await models.Announcement.findAll({});
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(announcement_id) {
        try {
            return await models.Announcement.findOne({
                where: {announcement_id}
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }
    
    async getAllByClassId(class_id) {
        try {
            return await models.Announcement.findAll({
                where: {class_id},
                include: [
                    {
                        model: models.Users,
                    }
                ]
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            return await models.Announcement.create(data);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(announcement_id, data) {
        try {
            await models.Announcement.update(data, { where: { announcement_id} });
            return await this.getOneById(announcement_id);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAnnouncement(announcement_id) {
        try {
            await models.Announcement.destroy({ where: { announcement_id } });
            return `deleted successfully`;
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new AnnouncementRepository();
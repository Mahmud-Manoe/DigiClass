const AnnouncementRepository = require("../repository/announcement.repository.js");
const { NotFound } = require("../utils/response.js");
const { emitDeleteAnnouncement } = require('../config/socket.js');


class AnnouncementService {
    async getAll() {
        return await AnnouncementRepository.getAll();
    }

    async getOneById(id) {
        const Announcement = await AnnouncementRepository.getOneById(id);
        if (!Announcement) {
            throw new NotFound("Questions Bank not found");
        }
        return Announcement;
    }
    async getAllByClassId(class_id) {
        const Announcement = await AnnouncementRepository.getAllByClassId(class_id);
        if (!Announcement) {
            throw new NotFound("Questions Bank not found");
        }
        return Announcement;
    }

    async createAnnouncement(class_id, user_id, data) {
        const { content } = data;
        return await AnnouncementRepository.store({
            class_id, 
            user_id,
            content
        });
    }

    async updateAnnouncement(id, data) {
        const isExists = await AnnouncementRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        return await AnnouncementRepository.update(id, data);
    }

    async deleteAnnouncement(id) {
        const isExists = await AnnouncementRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Questions Bank not found");
        }
        emitDeleteAnnouncement(isExists.class_id, id);
        return await AnnouncementRepository.deleteAnnouncement(id);
    }
}

module.exports = new AnnouncementService();
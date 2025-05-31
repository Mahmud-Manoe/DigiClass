const models = require("../models/index");
const { InternalServerError, NotFound } = require("../utils/response.js");

class UserInvitationsRepository {
    async getAll() {
        try {
            return await models.UserInvitation.findAll({});
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getStudent(classId) {
        try { 
            const teacher = await models.Classes.findOne({
                where: { class_id: classId },
                attributes: [],
                include: [
                    {
                        model: models.Users,
                        attributes: ["user_id", "name", "email"],
                        as: "teacher"
                    }
                ]
            });

            if (!teacher) {
                return { message: "Kelas tidak ditemukan", students: [] };
            }

            const students = await models.Users.findAll({
                attributes: ["user_id", "name", "email"],
                include: [
                    {
                        model: models.UserInvitation,
                        attributes: [],
                        required: true, // Hanya ambil siswa yang memiliki UserInvitation
                        include: [
                            {
                                model: models.Invitation,
                                attributes: [],
                                required: true, // Hanya ambil yang memiliki Invitation valid
                                include: [
                                    {
                                        model: models.Classes,
                                        where: { class_id: classId }, // Filter hanya untuk kelas tertentu
                                        attributes: [], // Tidak mengambil ulang class_id
                                        required: true, // Pastikan hanya data yang cocok
                                        as: "classInfo",
                                    },
                                ],
                                as: "invitation",
                            },
                        ],
                        as: "userInvitations",
                    },
                ],
                where: { role: "siswa" }, // Pastikan hanya mengambil user dengan role siswa
            });

            return {
                teacher: teacher,
                students: students
            };
        } catch (err) {
            throw new InternalServerError();
        }
    }


    async getOneById(id) {
        try {
            return await models.UserInvitation.findOne({
                where: { user_invitation_id: id },
                attributes: { exclude: ["createdAt", "updatedAt"] },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            return await models.UserInvitations.create(data);
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async findInvitationByCode(invitation_code) {
        try {
            return await models.Invitation.findOne({
                where: { invitation_code },
                include: [{
                    model: models.Classes,
                    as: "classInfo"
                }],
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async checkUserAlreadyJoined(user_id, invitation_id) {
        try {
            return await models.UserInvitation.findOne({
                where: { user_id, invitation_id },
                raw: true,
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async addUserToClass(user_id, invitation_id) {
        try {
            const result = await models.UserInvitation.create({ user_id, invitation_id });
            if (result) {
                return await models.Classes.findOne({
                    where: { invitation_id },
                })
            }


        } catch (err) {
            throw new InternalServerError();
        }
    }
    async update(id, data) {
        try {
            await models.UserInvitations.update(data, { where: { id } });
            return await this.getOneById(id);
        } catch (err) {
            throw new InternalServerError();
        }
    }



    async getUserInvitations(invitation_id, user_id) {
        try {
            return await models.UserInvitation.findOne({
                where: {
                    user_id: user_id,
                    invitation_id: invitation_id,
                },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async deleteUserInvitations(invitation_id, user_id) {
        try {

            await models.UserInvitation.destroy({
                where: {
                    user_id: user_id,
                    invitation_id: invitation_id,
                },
            });
        } catch (err) {
            throw new InternalServerError();
        }
    }
}

module.exports = new UserInvitationsRepository();
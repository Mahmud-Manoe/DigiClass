const UserInvitationsRepository = require("../repository/user_invitations.repository.js");
const ClassesRepository = require("../repository/classes.repository.js");
const AccumulatedScoresRepository = require("../repository/accumulated_scores.repository.js");
const { NotFound, UserAlreadyInClas } = require("../utils/response.js");

class UserInvitationsService {
    async getAll() {
        return await UserInvitationsRepository.getAll();
    }

    async getStudent(classId) {
        return await UserInvitationsRepository.getStudent(classId);
    }
    async getOneById(id) {
        const invitation = await UserInvitationsRepository.getOneById(id);
        if (!invitation) {
            throw new NotFound("User Invitation not found");
        }
        return invitation;
    }

    async createUserInvitations(data) {
        return await UserInvitationsRepository.store(data);
    }

    async joinClass(user_id, data) {

        const { invitation_code } = data;
        //Cari invitation_id berdasarkan invitation_code
        const invitation = await UserInvitationsRepository.findInvitationByCode(invitation_code);
        if (!invitation) {
            throw new NotFound
        }

        const invitation_id = invitation.invitation_id;

        // Cek apakah user sudah bergabung
        const existingUser = await UserInvitationsRepository.checkUserAlreadyJoined(user_id, invitation_id);
        if (existingUser) {
            throw new UserAlreadyInClas
        }
        await AccumulatedScoresRepository.store({
            user_id: user_id,
            class_id: invitation.classInfo.class_id
        });

         // Masukkan user ke dalam kelas
        return await UserInvitationsRepository.addUserToClass(user_id, invitation_id);
    }


    async updateUserInvitations(id, data) {
        const isExists = await UserInvitationsRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("User Invitation not found");
        }
        return await UserInvitationsRepository.update(id, data);
    }

    async deleteUserInvitations(class_id, user_id) {
        const dataClass = await ClassesRepository.getOneById(class_id);
        if (!dataClass) {
            throw new NotFound
        }
        const isExists = await UserInvitationsRepository.getUserInvitations(dataClass.invitation_id, user_id);
        if (!isExists) {
            throw new NotFound
        }

        await AccumulatedScoresRepository.deleteAccumulatedScores(user_id, dataClass.class_id);
        await UserInvitationsRepository.deleteUserInvitations(dataClass.invitation_id, user_id);

        return { id: parseInt(isExists.user_invitation_id) };
    }
}

module.exports = new UserInvitationsService();  
require("dotenv").config();
const AssignmentsRepository = require("../repository/assignments.repository.js");
const FileRepository = require("../repository/files.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class AssignmentsService {
    async getAssignments() {
        const question = await AssignmentsRepository.getAll();
        return question;
    }
    async getAssignmentsById(id) {
        const question = await AssignmentsRepository.getOneById(id);
        return question;
    }
    async getAssignmentsByClassId(id) {
        const question = await AssignmentsRepository.getAllByClassId(id);
        return question;
    }
    async createAssignments(id, data) {
        const class_id = id;
        const { assignment_name, assignment_content, cloudinary_id, link_pdf } = data
        const file = await FileRepository.store({
            cloudinary_id,
            link_pdf
        })
        const assignment = await AssignmentsRepository.store({
            assignment_name,
            assignment_content,
            class_id,
            file_id: file.file_id
        });
        return assignment;
    }

    async updateAssignmentsById(assignment_id, data) {

        const { assignment_name, assignment_content, cloudinary_id, link_pdf } = data
        const isExists = await AssignmentsRepository.getOneById(assignment_id);
        if (!isExists) {
            throw new NotFound();
        }
        const assignment = await AssignmentsRepository.update(assignment_id, {
            assignment_name,
            assignment_content,
        });
        await FileRepository.update(isExists.file_id, {
            cloudinary_id,
            link_pdf
        })

        return assignment;
    }

    async deleteAssignments(id) {
        const isExists = await AssignmentsRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const Question = await AssignmentsRepository.deleteAssignment(id);
        return Question;
    }
}


module.exports = new AssignmentsService();

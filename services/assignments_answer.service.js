require("dotenv").config();
const FileRepository = require("../repository/files.repository.js");
const AssignmentsAnswerRespository = require("../repository/assignments_answer.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");
const ScoreDetail = require("../repository/score.repository.js");
const Accumulated_scoresRepository = require("../repository/accumulated_scores.repository.js")


class AssignmentsAnswerService {
    async getAll() {
        const completion = await AssignmentsAnswerRespository.getAll();
        return completion;
    }

    async getAssignmentsAnswer(user_id, assignment_id) {
        const isExists = await AssignmentsAnswerRespository.getAnswer(user_id, assignment_id);
        if (!isExists) {
            throw new NotFound();
        }

        const completion = await AssignmentsAnswerRespository.getAnswer(user_id, assignment_id);
        return completion;
    }

    async getAllByAssignmentId(assignment_id) {
        const isExists = await AssignmentsAnswerRespository.getAnswerByAssignment(assignment_id);
        if (!isExists) {
            throw new NotFound();
        }

        const completion = await AssignmentsAnswerRespository.getAnswerByAssignment(assignment_id);
        return completion;
    }

    async getOneById(id) {
        const isExists = await AssignmentsAnswerRespository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const completion = await AssignmentsAnswerRespository.getOneById(id);
        return completion;
    }

    async createAssignmentsAnswer(user_id, assignment_id, data) {
        const { cloudinary_id, link_pdf } = data
        const file = await FileRepository.store({
            cloudinary_id,
            link_pdf
        })
        const completion = await AssignmentsAnswerRespository.store({
            user_id,
            assignment_id,
            file_id: file.file_id
        });
        return completion
    }

    async updateAssignmentsAnswerById(id, data) {
        const { score } = data
        const isExists = await AssignmentsAnswerRespository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const getAccumulated = await Accumulated_scoresRepository.getAccumulated(isExists.Assignment.class_id, isExists.user_id)
        await ScoreDetail.store({
            accumulated_score_id: getAccumulated[0].accumulated_score_id,
            type: "tugas",
            item_name: isExists.Assignment.assignment_name,
            student_score: score
        })
        const completion = await AssignmentsAnswerRespository.update(id, {
            score
        });
        return completion;
    }

    async deleteAssignmentsAnswer(id) {
        const isExists = await AssignmentsAnswerRespository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        // await cloudinaryConfig.uploader.destroy(isExists.cloudinary_id);

        const completion = await AssignmentsAnswerRespository.deleteCompletion(id);
        return completion;
    }
}


module.exports = new AssignmentsAnswerService();

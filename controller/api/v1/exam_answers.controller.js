const ExamAnswersService = require("../../../services/exam_answers.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class ExamAnswersController {
    async getExamAnswers(req, res) {
        try {
            const data = await ExamAnswersService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getExamAnswersById(req, res) {
        try {
            const id = req.params.id;
            const data = await ExamAnswersService.getExamAnswersById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getExamAnswersStudent(req, res) {
        try {
            const { exam_id, kelas_id } = req.query;
            
            const data = await ExamAnswersService.getExamAnswersStudent(exam_id, kelas_id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getExamAnswersByQuestionId(req, res) {
        try {
            const {user_id} = req.user;
            const questions_id = req.params.id;
            const data = await ExamAnswersService.getExamAnswersByQuestionId(questions_id, user_id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getExamScoresWithDetails   (req, res) {
        try {
          const examId = req.params.examId;
          const {id} = req.params;
          const data = await ExamAnswersService.getStudentScoresWithDetail(examId, id);
          return SuccessFetchResponse(res, data);
        } catch (err) {
          res.status(err.status).send(err);
        }
      };
    async creteExamAnswers(req, res) {
        try {            
            const {user_id} = req.user;
            const { student_answer } = req.body;
            const questions_id = parseInt(req.query.questions_id)
            const data = await ExamAnswersService.creteExamAnswers(user_id, questions_id, student_answer)
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async updateExamAnswersById (req, res) {
        try {            
            const { student_answer } = req.body;
            const answer_id = req.params.id
            const data = await ExamAnswersService.updateExamAnswer(answer_id,student_answer)
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async updateScoreExamAnswersById (req, res) {
        try {            
            const { score } = req.body;
            const answer_id = req.params.id
            
            const data = await ExamAnswersService.updateScoreExamAnswersById(answer_id,score)
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async updateScoreStudent(req, res) {
        try {
            const answer_id = req.params.id;
            const data = await ExamAnswersService.updateScoreStudent(answer_id, req.body)
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new ExamAnswersController();

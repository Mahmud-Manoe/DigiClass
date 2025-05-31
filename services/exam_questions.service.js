require("dotenv").config();
const ExamQuestionsRepository = require("../repository/exam_questions.repository.js");
const QuestionsBankRepository = require("../repository/questions_bank.repository.js");

const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class ExamQuestionsService {
    async getAll() {

        const student = await ExamQuestionsRepository.getAll();
        return student;
    }
    async getExamQuestionsById(id) {

        const student = await ExamQuestionsRepository.getOneById(id);
        return student;
    }

    async getExamQuestionsByExamId(id) {

        const student = await ExamQuestionsRepository.getAllByExamId(id);
        return student;
    }
    async getExamQuestionsStudentByExamId(id) {

        const student = await ExamQuestionsRepository.getAllByExamIdStudent(id);
        return student;
    }

    async createExamQuestions(exam_id, data) {
        const { question_type, question_content, answer_option, correct_answer, score } = data; //bank

        const totalQuestions = await ExamQuestionsRepository.count(exam_id);

        const bank = await QuestionsBankRepository.store({
            question_type,
            question_content,
            answer_option,
            correct_answer
        });

        const question = await ExamQuestionsRepository.store({
            question_number: totalQuestions + 1,
            exam_id,
            bank_id: bank.bank_id,
            score,
        });
        return question;
    }

    async updateExamQuestionsById(id, data) {
        const { question_type, question_content, answer_option, correct_answer, score } = data; //bank

        const isExists = await ExamQuestionsRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        console.log(isExists.bank_id);
        const bank = await QuestionsBankRepository.update(isExists.bank_id, {
            question_type,
            question_content,
            answer_option,
            correct_answer
        })
        const question = await ExamQuestionsRepository.update(id, {
            score,
        });
        return question;
    }

    async updateExamScore(id, data) {
        const { score } = data; //bank
        const isExists = await ExamQuestionsRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const question = await ExamQuestionsRepository.update(id, {
            score
        });
        return question;
    }

    async deleteExamQuestions(id) {
        const isExists = await ExamQuestionsRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        // const isUsedAnswer = await QuestionsBankRepository.getOneById(isExists.bank_id);
        // if (isUsedAnswer) {
        //     throw new Error("Tidak bisa menghapus, karena masih digunakan di exam_answer.");
        // }

        // const isUsed = await QuestionsBankRepository.getOneById(isExists.bank_id);
        // if (isUsed) {
        //     throw new Error("Tidak bisa menghapus, karena masih digunakan di exam_questions.");
        // }

        const examQuestion = await ExamQuestionsRepository.deleteExamQuestions(id);
        const Question2 = await QuestionsBankRepository.deleteQuestionsBank(isExists.bank_id);
        
        return examQuestion;
    }
}


module.exports = new ExamQuestionsService();

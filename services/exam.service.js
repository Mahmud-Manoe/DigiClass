require("dotenv").config();
const ExamRepository = require("../repository/exam.repository.js");
const { NotFound } = require("../utils/response.js");
const aiApi = require("../utils/aiAPI.js");
function isAnswerCorrect(studentAnswer, correctAnswer) {
    const a = String(studentAnswer?.[0] || "").trim().toLowerCase();
    const b = String(correctAnswer?.[0] || "").trim().toLowerCase();
    return a === b;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    const sorted1 = [...arr1].sort();
    const sorted2 = [...arr2].sort();

    return sorted1.every((value, index) => value === sorted2[index]);
}

function pairing(arr1, arr2, skorMaks) {
    const map1 = Object.fromEntries(arr1.map(item => [item.domain, item.codomain]));
    const map2 = Object.fromEntries(arr2.map(item => [item.domain, item.codomain]));

    let benar = 0;
    const total = Object.keys(map1).length;

    const result = Object.keys(map1).map(domain => {
        const expected = map1[domain];
        const actual = map2[domain];
        const isEqual = expected === actual;

        if (isEqual) benar++;

        return {
            domain,
            expected,
            actual,
            isEqual
        };
    });

    const skor = (benar / total) * skorMaks;
    
    return skor
}
class ExamService {
    async getAll() {
        return await ExamRepository.getAll();
    }

    async getOneById(id) {
        const exam = await ExamRepository.getOneById(id);
        if (!exam) {
            throw new NotFound("Exam not found");
        }
        return exam;
    }
    async getAllByClassId(id) {
        const exam = await ExamRepository.getAllByClassId(id);
        return exam;
    }

    async createExam(class_id, data) {
        const { exam_name, exam_start, duration, type } = data;
        const now = new Date(); // Waktu saat ini
        const startTime = new Date(exam_start);
        const endTime = new Date(startTime.getTime() + duration * 60000); // Convert duration dari menit ke milidetik

        let state;
        if (now < startTime) {
            state = "draft"; // Jika waktu sekarang sebelum exam_start
        } else if (now >= startTime && now <= endTime) {
            state = "active"; // Jika waktu sekarang antara exam_start dan exam_start + duration
        } else {
            state = "finished"; // Jika waktu sekarang lebih dari exam_start + duration
        }

        return await ExamRepository.store({
            exam_name,
            exam_start,
            duration,
            class_id,
            status: state,
            type
        });
    }

    async gradeExamAnswers(examId) {
        const answers = await ExamRepository.getAnswersByExamId(examId);


        const results = await Promise.all(
            answers.map(async (answer) => {

                const questionBank = answer.ExamQuestion.bank;
                const question = answer.ExamQuestion;
                let score = 0


                if (questionBank.question_type === 'E') {
                    score = await aiApi.evaluateAnswer(questionBank.question_content, questionBank.correct_answer, answer.student_answer, question.score);
                } else if (questionBank.question_type === 'BS' || questionBank.question_type === 'I' || questionBank.question_type === 'PG') {
                    const correct = isAnswerCorrect(answer.student_answer, questionBank.correct_answer);
                    score = correct ? question.score : 0;
                } else if (questionBank.question_type === 'PB') {
                    const correct = arraysEqual(answer.student_answer, questionBank.correct_answer);
                    score = correct ? question.score : 0;
                } else if (questionBank.question_type === 'M') {
                    const correct = pairing(answer.student_answer, questionBank.correct_answer, question.score);
                    score = correct ? correct : 0;
                }

                await ExamRepository.updateAnswerScore(answer.answer_id, score);

                return {
                    answer_id: answer.answer_id,
                    question_id: answer.ExamQuestion.question_id,
                    student_answer: answer.student_answer,
                    correct_answer: questionBank.correct_answer,
                    question_type: questionBank?.question_type,
                    score_student: score,
                    score_question: question.score
                };
            })
        );
        return results;
    }

    async updateExam(id, data) {
        const isExists = await ExamRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Exam not found");
        }
        return await ExamRepository.update(id, data);
    }

    async deleteExam(id) {
        const isExists = await ExamRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound("Exam not found");
        }
        return await ExamRepository.deleteExam(id);
    }
}

module.exports = new ExamService();
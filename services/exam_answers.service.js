require("dotenv").config();
const ExamAnswersRepository = require("../repository/exam_answers.repository.js");
const {
  NotAuthenticated,
  NotFound,
  UserAlreadyExists,
  KelasAlreadyExists,
} = require("../utils/response.js");
const ScoreDetail = require("../repository/score.repository.js");
const Accumulated_scoresRepository = require("../repository/accumulated_scores.repository.js")
const UserInvitationsRepository = require("../repository/user_invitations.repository.js");
const ExamRepository = require("../repository/exam.repository.js");
const ExamAnswerRepository = require("../repository/exam_answers.repository.js");
const e = require("cors");

class ExamAnswersService {
  async getAll() {
    return await ExamAnswersRepository.getAll();
  }
  async getExamAnswersById(id) {
    return await ExamAnswersRepository.getOneById(id);
  }
  // async getExamAnswersStudent(exam_id, kelas_id) {
  //   const students = await UserInvitationsRepository.getStudent(parseInt(kelas_id));

  //   const results = await Promise.all(students.students.map(async (student) => {
  //     const detail = await ExamAnswerRepository.getAnswersByExamIdWithDetails(exam_id, student.user_id);
  //     return {
  //       user_id: student.user_id,
  //       name: student.name,
  //       question_score: detail.ExamQuestion.score,
  //       answers: detail.student_answer,
  //       answer_score: detail.score
  //     };
  //   }));


  //   return results
  // }

  async getExamAnswersStudent(exam_id, kelas_id) {
    const students = await UserInvitationsRepository.getStudent(parseInt(kelas_id));

    const results = await Promise.all(students.students.map(async (student) => {
      const details = await ExamAnswerRepository.getAnswersByExamIdWithDetails(exam_id, student.user_id);
      const exam = await ExamRepository.getOneById(exam_id)

      // Jika tidak ada jawaban, tetap kembalikan nama & user_id
      if (!details || details.length === 0) {
        return {
          user_id: student.user_id,
          name: student.name,
          answers: [],
          total_score: 0,
          score: 0
        };
      }

      const answers = details.map((d) => ({
        question_number: d.ExamQuestion.question_number,
        score: d.ExamQuestion.score,
        answer_id: d.answer_id,
        student_answer: d.student_answer,
        scoreStudent: d.score,
        question_type: d.ExamQuestion.bank?.question_type,
        question_content: d.ExamQuestion.bank?.question_content,
        correct_answer: d.ExamQuestion.bank?.correct_answer,
        answer: d.answer,
      }));

      const total_score = answers.reduce((sum, a) => sum + (a.scoreStudent || 0), 0);
      const score = answers.reduce((sum, a) => sum + (a.score || 0), 0);



      if (kelas_id) {
        const getAccumulated = await Accumulated_scoresRepository.getAccumulated(
          kelas_id,
          student.user_id
        )

        const accumulatedId = getAccumulated?.[0]?.accumulated_score_id;

        if (accumulatedId) {
          await ScoreDetail.store({
            accumulated_score_id: accumulatedId,
            type: exam.type,
            item_name: exam.exam_name || "Ujian",
            student_score: total_score,
            question_score: score
          });

        }
      }

      return {
        user_id: student.user_id,
        name: student.name,
        answers,
        total_score,
        score
      };


    }));



    return results;
  }

  async getExamAnswersByQuestionId(questions_id, users_id) {
    return await ExamAnswersRepository.getEOneByQuestionId(questions_id, users_id);
  }

  async getStudentScoresWithDetail(examId, id) {
    const rawAnswers = await ExamAnswersRepository.getAnswersByExamIdWithDetails(examId, id);
    const exam = await ExamRepository.getOneById(examId)
    const groupedByStudent = {};

    rawAnswers.forEach((answer) => {
      const userId = answer.users_id;
      const question = answer.ExamQuestion;
      const questionBank = question.QuestionBank;

      if (!userId || !question) return;

      if (!groupedByStudent[userId]) {
        groupedByStudent[userId] = {
          user_id: userId,
          name: answer.User.name,
          total_score: 0,
          score: 0,
          answers: []
        };
      }

      const scoreStudent = answer.score || 0;
      const maxScore = question.score || 0;

      groupedByStudent[userId].answers.push({
        questions_id: question.questions_id,
        question_number: question.question_number,
        question_type: questionBank?.question_type,
        student_answer: answer.student_answer,
        correct_answer: question.correct_answer,
        scoreStudent,
        score: maxScore
      });

      groupedByStudent[userId].total_score += scoreStudent;
      groupedByStudent[userId].score += maxScore;
    });

    const currentStudent = groupedByStudent[parseInt(id)];


    //tambah ke score detail
    if (currentStudent && exam?.class_id) {
      const getAccumulated = await Accumulated_scoresRepository.getAccumulated(
        exam.class_id,
        parseInt(id)

      )

      const accumulatedId = getAccumulated?.[0]?.accumulated_score_id;

      if (accumulatedId) {
        await ScoreDetail.store({
          accumulated_score_id: accumulatedId,
          type: exam.exam_type,
          item_name: exam.exam_name || "Ujian",
          student_score: currentStudent.total_score,
          question_score: currentStudent.score
        });

      }
    }


    return Object.values(groupedByStudent);
  };

  async creteExamAnswers(users_id, questions_id, student_answer) {
    return await ExamAnswersRepository.store({
      users_id,
      questions_id,
      student_answer,
      score: 0
    });
  }
  async updateExamAnswer(answer_id, student_answer) {
    return await ExamAnswersRepository.update(answer_id, {
      student_answer,
    });
  }
  async updateScoreExamAnswersById(answer_id, score) {
    return await ExamAnswersRepository.update(answer_id, {
      score,
    });
  }
  async updateScoreStudent(answer_id, data) {
    const { score } = data; //bank
    const isExists = await ExamAnswersRepository.getOneById(answer_id);
    if (!isExists) {
      throw new NotFound();
    }
    // await ScoreDetail.store({
    //   users_id: isExists.users_id,
    //   student_score: score

    // })
    return await ExamAnswersRepository.update(answer_id, {
      score
    });
  }
}

module.exports = new ExamAnswersService();

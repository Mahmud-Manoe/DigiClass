require("dotenv").config();
const { name } = require("ejs");
const Accumulated_scoresRepository = require("../repository/accumulated_scores.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class Accumulated_scoresService {
    async getAll() {

        const accumulated_scores = await Accumulated_scoresRepository.getAll();
        return accumulated_scores;
    }
    async getAllByClass(id) {
        const students = await Accumulated_scoresRepository.getAllByClass(id);

        const results = [];
        for (const student of students) {
            const details = student.ScoreDetails;

            const absen = details.filter(d => d.type === 'absen');
            const tugas = details.filter(d => d.type === 'tugas');
            const uh = details.filter(d => d.type === 'uh');
            const uts = details.filter(d => d.type === 'uts');
            const uas = details.filter(d => d.type === 'uas');

            const avg = arr => arr.length ? arr.reduce((sum, d) => sum + d.student_score / d.question_score, 0) / arr.length : 0;

            const absenAvg = avg(absen);
            const tugasAvg = avg(tugas);
            const utsAvg = avg(uts);
            const uasAvg = avg(uas);
            const uhAvg = avg(uh);

            const finalScore = (absenAvg * 10) + (tugasAvg * 20) + (utsAvg * 30) + (uasAvg * 40);

            const tugasList = tugas.map(item => ({
                item_name: item.item_name,
                nilai_persen: Math.round((item.student_score / item.question_score) * 100)
            }));

            const uhList = uh.map(item => ({
                item_name: item.item_name,
                nilai_persen: Math.round((item.student_score / item.question_score) * 100)
            }));

            const utsScore = uts[0]
                ? Math.round((uts[0].student_score / uts[0].question_score) * 100)
                : null;

            const uasScore = uas[0]
                ? Math.round((uas[0].student_score / uas[0].question_score) * 100)
                : null;

            results.push({
                user_id: student.user_id,
                name: student.User?.name,
                kehadiran: Math.round(absenAvg * 100), // persentase kehadiran
                tugas: tugasList,
                uts: utsScore,
                uas: uasScore,
                final_score: Math.round(finalScore),
                grade: convertScore(finalScore).grade,
                scale: convertScore(finalScore).scale.toFixed(2)
            });

            await Accumulated_scoresRepository.update(student.accumulated_score_id, {
                total_assignment_score: Math.round(tugasAvg * 100),
                total_exam_score: Math.round(((utsAvg + uasAvg) / 2) * 100),
                final_score: Math.round(finalScore),
                grade: convertScore(finalScore).grade
            }); 
        }

        function convertScore(score) {
            if (score >= 96) return { grade: "A", scale: 4.00 };
            if (score >= 91) return { grade: "A", scale: 3.90 };
            if (score >= 86) return { grade: "A-", scale: 3.67 };
            if (score >= 81) return { grade: "B+", scale: 3.33 };
            if (score >= 76) return { grade: "B", scale: 3.00 };
            if (score >= 71) return { grade: "B-", scale: 2.67 };
            if (score >= 66) return { grade: "C+", scale: 2.33 };
            if (score >= 61) return { grade: "C", scale: 2.00 };
            if (score >= 56) return { grade: "C-", scale: 1.67 };
            if (score >= 51) return { grade: "D+", scale: 1.33 };
            if (score >= 41) return { grade: "D", scale: 1.00 };
            return { grade: "E", scale: 0.00 };
          }

        return results;

    }

    async getOneById(id) {

        const accumulated_scores = await Accumulated_scoresRepository.getOneById(id);
        return accumulated_scores;
    }

    async getScoreStudent(class_id,) {

        const accumulated_scores = await Accumulated_scoresRepository.getScoreStudent(class_id);
        if (!accumulated_scores) {
            throw new NotFound();
        }
        return accumulated_scores;
    }

    async getAccumulatedByClassId(class_id, user_id) {

        const accumulated_scores = await Accumulated_scoresRepository.getAccumulated(class_id, user_id);
        if (!accumulated_scores) {
            throw new NotFound();
        }
        return accumulated_scores;
    }

    async createAccumulated_scores(id, data) {
        const users_id = id;
        const { jawaban, questions_id, boolean, skor } = data;
        const accumulated_scores = await Accumulated_scoresRepository.store({
            users_id,
            questions_id,
            jawaban,
            boolean,
            skor,
        });
        return accumulated_scores;
    }

    async updateAccumulated_scores(id, query, data) {
        const { boolean, skor } = query;
        const { jawaban } = data;
        const isExists = await Accumulated_scoresRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const accumulated_scores = await Accumulated_scoresRepository.update(id, {
            jawaban,
            boolean,
            skor,
        });

        return accumulated_scores;
    }

    async deleteAccumulated_scores(id) {
        const isExists = await Accumulated_scoresRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const accumulated_scores = await Accumulated_scoresRepository.deleteAccumulated_scores(id);
        return accumulated_scores;
    }
}
module.exports = new Accumulated_scoresService();
const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class AccumulatedScoresRepository {
    async getAll() {
        try {
            const accumulated_score = await models.AccumulatedScore.findAll({ });
            return accumulated_score;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getAllByClass(id) {
        try {
            const accumulated_score = await models.AccumulatedScore.findAll({
                where: { class_id: id },
                include: [
                    {
                        model: models.ScoreDetail,
                    },
                    {
                        model: models.Users,
                    }
                ]
            });
            return accumulated_score;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async getOneById(id) {
        try {
            const accumulated_score = await models.AccumulatedScore.findOne({
                where: { id }
            });
            return accumulated_score;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    async getScoreStudent(class_id) {
        try {
            const accumulated_score = await models.AccumulatedScore.findAll({
                where: { class_id },
                include: [
                    {
                        model: models.Users,
                    },
                    {
                        model: models.ScoreDetail,
                    }
                ],
                order: [["user_id", "ASC"]]
            });
            return accumulated_score;
        } catch (err) {
            throw new InternalServerError();
        }
    }
    
    async getAccumulated(class_id, user_id) {
        try {
            const accumulated_score = await models.AccumulatedScore.findAll({
                where: { class_id, user_id },
                include: [
                    {
                        model: models.Users,
                    },
                    {
                        model: models.ScoreDetail,
                    }
                ],
                order: [["user_id", "ASC"]]
            });
            return accumulated_score;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async store(data) {
        try {
            const accumulated_score = await models.AccumulatedScore.create(data);
            const accumulated_score2 = await models.AccumulatedScore.findOne({
                where: {
                    accumulated_score_id: accumulated_score.accumulated_score_id,
                },
            });
            return accumulated_score2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(accumulated_score_id, data) {
        try {            
            await models.AccumulatedScore.update(data, { where: { accumulated_score_id } });
            const accumulated_score = await models.AccumulatedScore.findOne({
                where: {
                    accumulated_score_id,
                }
            });
            return accumulated_score;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteAccumulatedScores(user_id, class_id) {
        try {
            models.AccumulatedScore.destroy({
                where: { user_id, class_id, }
            });
            return  "berhasil di Apus" ;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    // async delete(accumulated_score_id) {
    //     try {
    //         models.AccumulatedScore.destroy({
    //             where: { accumulated_score_id, }
    //         });
    //         return { id: parseInt(accumulated_score_id) };
    //     } catch (err) {
    //         throw new InternalServerError();
    //     }
    // }
}
module.exports = new AccumulatedScoresRepository();
const AccumulatedScoresService = require("../../../services/accumulated_scores.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");
class AccumulatedScoresController {
    async getAccumulatedScores(req, res) {
        try {

            const data = await AccumulatedScoresService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getAccumulatedScoresByClass(req, res) {
        try {
            const id = req.params.id;
            const data = await AccumulatedScoresService.getAllByClass(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getAccumulatedScoresById(req, res) {
        const id = req.params.id;
        try {
            const data = await AccumulatedScoresService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getScoreByClassId(req, res) {
        const { classId } = req.params;
        try {
            const data = await AccumulatedScoresService.getScoreStudent(classId);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async getScoreStudentByClassId(req, res) {
        const { classId, userId } = req.params;
        try {
            const data = await AccumulatedScoresService.getAccumulatedByClassId(classId, userId);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async createAccumulatedScores(req, res) {
        try {
            const id = req.query.materials_id;
            const data = await Accumulated_scoresService.createAccumulatedScores(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async updateAccumulatedScoresById(req, res) {
        try {
            const id = req.params.id;
            const data = await Accumulated_scoresService.updateAccumulatedScores(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async deleteAccumulatedScores(req, res) {
        try {
            const id = req.params.id;
            const data = await Accumulated_scoresService.deleteAccumulatedScores(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new AccumulatedScoresController();
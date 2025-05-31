const AbsenService = require("../../../services/absen.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class AbsenController {
    async getAbsen(req, res) {
        try {
            const data = await AbsenService.getAll();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async getAbsenById(req, res) {
        try {
            const id = req.params.id;
            const data = await AbsenService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async createAbsen(req, res) {
        try {
            const data = await AbsenService.createAbsen(req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async updateAbsenById(req, res) {
        try {
            const id = req.params.id;
            const data = await AbsenService.updateAbsen(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }

    async deleteAbsen(req, res) {
        try {
            const id = req.params.id;
            await AbsenService.deleteAbsen(id);
            return SuccessFetchResponse(res, { message: `Questions Bank with id ${id} deleted successfully` });
        } catch (err) {
            res.status(err.status || 500).send(err);
        }
    }
}

module.exports = new AbsenController();
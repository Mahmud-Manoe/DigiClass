const MaterialService = require("../../../services/materials.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class MaterialController {
    async getMaterials(req, res) {
        try {
            const data = await MaterialService.getMaterials();
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getMaterialById(req, res) {
        try {
            const id = req.params.id;
            const data = await MaterialService.getMaterialById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async getMaterialByclassId(req, res) {
        try {
            const id = req.params.id;
            const data = await MaterialService.getMaterialByclassId(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async createMaterial(req, res) {
        try {
            const id = req.query.class_id;
            const data = await MaterialService.createMaterial(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async updateMaterialById(req, res) {
        try {
            const material_id = req.params.id;
            const data = await MaterialService.updateMaterial(material_id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
    async deleteMaterial(req, res) {
        try {
            const id = req.params.id;
            const data = await MaterialService.deleteMaterial(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }
}
module.exports = new MaterialController();

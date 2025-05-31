const ClassesService = require("../../../services/classes.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class ClassController {
  async getClasses(_, res) {
    try {
      const data = await ClassesService.getAll();
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async getClassesById(req, res) {

    try {
      const id = req.params.id;
      const data = await ClassesService.getOneById(id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async getClassesByTeacherId(req, res) {

    try {
      const {user_id} = req.user;
      const data = await ClassesService.getClassesByTeacherId(user_id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async getClassesByStudentId(req, res) {
    try {
      const {user_id} = req.user;
      const data = await ClassesService.getClassesByStudentId(user_id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async createClasses(req, res) {
    try {
      const { user_id } = req.user;
      const data = await ClassesService.createClasses(user_id, req.body);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async updateClassesById(req, res) {
    const id = req.params.id;
    try {
      const data = await ClassesService.updateClassesById(id, req.body);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async deleteClasses(req, res) {
    try {
      const id = req.params.id;
      const data = await ClassesService.deleteClasses(id, req.user);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
}

module.exports = new ClassController();

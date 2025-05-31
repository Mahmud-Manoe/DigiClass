const UserService = require("../../../services/users.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class UserController {
  async registerUser(req, res) {
    try {
      const data = await UserService.register(req.body);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async loginUser(req, res) {
    try {
      const { email, password, roles } = req.body;
      const data = await UserService.login(email, password, roles);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async logoutUser(req, res) {
    try {
      const data = await UserService.logout(req.token);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async profile(req, res) {
    try {
      const id = req.user.user_id;
      const data = await UserService.getOneById(id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const data = await UserService.getOneById(id);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }

  async getUsers(_, res) {
    try {
      const data = await UserService.getAll();
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
  async updateProfile(req, res) {
    try {
      const { id } = req.user;
      const data = await UserService.updateUser(id, req.body, req);
      return SuccessFetchResponse(res, data);
    } catch (err) {
      res.status(err.status).send(err);
    }
  }
}

module.exports = new UserController();

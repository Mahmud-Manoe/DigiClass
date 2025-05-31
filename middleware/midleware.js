require("dotenv").config();
const jwt = require("jsonwebtoken");
const { NotAuthenticated, Forbidden } = require("../utils/response.js");

class Authentication {
  async requiredToken(req, res, next) {
    try {

      const bearerToken = req.headers.authorization;
      const token = bearerToken.split("Bearer ")[1];

      const payload = jwt.verify(token, process.env.TOKEN_SECRET, {
        // maxAge: "1h",
      });
      req.token = token
      req.user = payload;
      next();
    } catch (err) {
      res.status(401).send(new NotAuthenticated());
    }
  }

  async isStudent(req, res, next) {
    if (!req.user) {
      next(new NotAuthenticated());
    }

    const { role } = req.user;
    if (role === "siswa") {
      next();
      return;
    }
    res.status(403).send(new Forbidden());
  }

  async isTeacher(req, res, next) {
    if (!req.user) {
      next(new NotAuthenticated());
    }

    const { role } = req.user;
    if (role === "guru") {
      next();
      return;
    }
    res.status(403).send(new Forbidden());
  }

  async isAdmin(req, res, next) {
    if (!req.user) {
      next(new NotAuthenticated());
    }

    const { role } = req.user;
    if (role === "admin") {
      next();
      return;
    }
    res.status(403).send(new Forbidden());
  }

  async isSuperadmin(req, res, next) {
    if (!req.user) {
      next(new NotAuthenticated());
    }

    const { role } = req.user;
    if (role === "superadmin") {
      next();
      return;
    }
    res.status(403).send(new Forbidden());
  }


}

module.exports = new Authentication();

const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");
const { Op } = require("sequelize");
// const {Op} = require("Sequelize");
class UserRepository {

  async getOneByEmail(query) {
    try {
      const { email, role } = query;
      const user = await models.Users.findOne({
        where: { email, role },
      });
      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getOneByEmailRole(query) {
    try {
      const { email, role } = query;
      const user = await models.users.findOne({
        where: { email, role },
      });
      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getOneById(id) {
    try {
      const user = await models.Users.findOne({
        where: {
          user_id: id,
        },
      });
      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getOneByName(name, role, email) {
    try {
      const user = await models.Users.findOne({
        where: {
            role,
            [Op.or]: [
                { name },
                { email }
            ]
        }
    });
      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getAll() {
    try {
      const users = await models.Users.findAll({});
      return users;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async store(data) {
    try {
      const user = await models.Users.create(data);
      const newUser = await models.Users.findOne({
        where: {
          user_id: user?.user_id,
        },
        attributes: {
          exclude: ["password", "created_at", "updated_at"],
        },
      });
      return newUser;
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async update(id, data) {
    try {
      await models.users.update(data, { where: { id } });
      const user = await models.users.findOne({
        where: {
          id: id,
        },
        attributes: {
          exclude: ["password"],
        },
      });
      return user;
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

module.exports = new UserRepository();

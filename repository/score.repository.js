const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");
const { Op } = require("sequelize");
// const {Op} = require("Sequelize");
class ScoreRepository {

  // async getOneByEmail(query) {
  //   try {
  //     const { email } = query;
  //     const user = await models.Users.findOne({
  //       where: { email },
  //     });
  //     return user;
  //   } catch (err) {
  //     throw new InternalServerError();
  //   }
  // }
  async store(data) {
    try {
      const SD = await models.ScoreDetail.create(data);
      const newSD = await models.ScoreDetail.findOne({
        where: {
          score_detail_id: SD?.score_detail_id,
        },
      });
      return newSD;
      
    } catch (err) {
      throw new InternalServerError();
    }
  }
  // async update(id, data) {
  //   try {
  //     await models.users.update(data, { where: { id } });
  //     const user = await models.users.findOne({
  //       where: {
  //         id: id,
  //       },
  //       attributes: {
  //         exclude: ["password"],
  //       },
  //     });
  //     return user;
  //   } catch (err) {
  //     throw new InternalServerError();
  //   }
  // }
}

module.exports = new ScoreRepository();

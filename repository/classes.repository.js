const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class ClassesRepository {

  async getAll() {
    try {
      return await models.Classes.findAll({});
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getOneById(id) {
    try {
      return await models.Classes.findOne({
        where: { class_id: id },
        include: [
          {
            model: models.Users,
            as: "teacher"
          },
          {
            model: models.Invitation,
            as: "invitation"
          }
        ]
      });
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async getClassesByTeacherId(user_id) {
    try {
      return await models.Classes.findAll({
        where: { user_id },
        include: [
          {
            model: models.Users,
            as: "teacher"
          },
          {
            model: models.Invitation,
            as: "invitation"
          }
        ]
      });
    } catch (err) {
      throw new InternalServerError();
    }
  }
  async getClassesByStudentId(user_id) {
    try {
      const classes = await models.UserInvitation.findAll({
        where: { user_id },
        include: [
          {
            model: models.Invitation,  // Join ke tabel invitations
            as: "invitation",
            include: [
              {
                model: models.Classes,  // Join ke tabel classes
                as: "classInfo",
              },
            ],
          },
        ],
      });
    // return classes
    console.log(classes);
      return classes.map((item) => item.invitation?.classInfo).filter(Boolean);
    } catch (err) {
      console.log(err, "k");
      throw new InternalServerError();
    }
  }
  
  async getOneByName(class_name) {
    try {
      return await models.Classes.findOne({
        where: { class_name },
      });
    } catch (err) {
      throw new InternalServerError();
    }
  }
  
  async store(data) {
    try {
      const kelas = await models.Classes.create(data);
      const Kelas2 = await models.Classes.findOne({
        where: {
          class_id: kelas.class_id,
        },
      });
      return Kelas2;
    } catch (err) {
      console.log(err, "k");
      throw new InternalServerError();
    }
  }
  async update(id, data) {
    try {
      await models.Classes.update(data, { where: { class_id : id } });
      const kelas = await models.Classes.findOne({
        where: {
          class_id: id,
        },
      });
      return kelas;
    } catch (err) {
      throw new InternalServerError();
    }
  }

  async deleteClasses(id) {
    try {
      models.Classes.destroy({
        where: { class_id: id, },
      });
      return { id: parseInt(id) };
    } catch (err) {
      throw new InternalServerError();
    }
  }
}

module.exports = new ClassesRepository();

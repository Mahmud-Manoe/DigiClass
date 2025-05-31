require("dotenv").config();
const bcrypt = require("bcrypt");
const { generateToken, getRandomToken, makeCode } = require("../utils/jwt.util.js");
const ClassesRepository = require("../repository/classes.repository.js");
const InvitationRepository = require("../repository/invitations.repository.js");
const cloudinaryConfig = require("../utils/cloudinary.js");
const { sendEmail } = require("../utils/email.js")
const {
  NotAuthenticated,
  NotFound,
  UserAlreadyExists,
  KelasAlreadyExists
} = require("../utils/response.js");
const invitations = require("../models/invitations.js");
class ClassesService {

  async getAll() {
    return await ClassesRepository.getAll();
  }

  async getOneById(id) {
    return await ClassesRepository.getOneById(id);
  }

  async getClassesByTeacherId(id) {
    return await ClassesRepository.getClassesByTeacherId(id);
  }

  async getClassesByStudentId(id) {

    const classes = await ClassesRepository.getClassesByStudentId(id);

    // if (classes.length === 0) {
    //   throw new Error("Siswa belum terdaftar di kelas mana pun.");
    // }
    
    if (classes == []) {
      throw new Error("Siswa belum terdaftar di kelas mana pun.");
    }

    return classes;
  }

  async createClasses(id, data) {
    const { class_name, description, format_absen, format_nilai } = data;
    const isExists = await ClassesRepository.getOneByName(class_name);
    if (isExists) {
      throw new KelasAlreadyExists();
    }

    const user_id = id;
    const code = makeCode();

    const invite = await InvitationRepository.store({
      invitation_code: code,
    });

    const kelas = await ClassesRepository.store({
      class_name,
      description,
      user_id,
      invitation_id: invite.invitation_id,
      format_absen : "pertemuan",
      format_nilai : "rekap"
    });

    return kelas;
  }

  async updateClassesById(id, data, res) {
    const { class_name, description } = data;
    const isExists = await ClassesRepository.getOneById(id);
    if (!isExists) {
      throw new NotFound();
    }

    const kelas = await ClassesRepository.update(id, {
      class_name,
      description
    });

    return kelas;

  }

  async deleteClasses(id) {
    const isExists = await ClassesRepository.getOneById(id);
    if (!isExists) {
      throw new NotFound();
    }

    const kelas = await ClassesRepository.deleteClasses(id);
    return kelas;
  }

}


module.exports = new ClassesService();

require("dotenv").config();
const bcrypt = require("bcrypt");
const { generateToken, getRandomToken, deleteToken } = require("../utils/jwt.util.js");
const cloudinaryConfig = require("../utils/cloudinary.js");
const { sendEmail } = require("../utils/email.js")
const UserRepository = require("../repository/users.repository.js");
const {
  NotAuthenticated,
  NotFound,
  UserAlreadyExists,
} = require("../utils/response.js");

class UserService {
  async login(email, password, role) {
    const user = await UserRepository.getOneByEmail({ email, role });
    if (!user) {
      throw new NotFound();
    }
    const authenticate = await bcrypt.compare(password, user.password);

    if (authenticate) {
      const payload = {
        user_id: user.user_id,
        email: user.email,
        role: user.role,
      };

      const token = await generateToken(payload);
      return { ...payload, token: token };
    }
    throw new NotAuthenticated();
  }
  async logout(token) {
    console.log("logout");
  }

  async register(data) {
    const { name, email, password, role } = data;

    const isExists = await UserRepository.getOneByName(name, role, email);
    if (isExists) {
      throw new UserAlreadyExists();
    }
    // const randomToken = getRandomToken();
    // const content = `https://localhost:300/confirm/${randomToken}?email=${email}`
    // sendEmail(email, 'confirmation', content);
    const encryptedPassword = await bcrypt.hash(password, 10);
    const user = await UserRepository.store({
      name,
      email,
      password: encryptedPassword,
      role,
    });

    return user;
  }
  async getOneById(id) {
    const isExists = await UserRepository.getOneById(id);
    if (!isExists) {
      throw new NotFound();
    }
    const user = await UserRepository.getOneById(id);
    return user;
  }

  async getAll() {

    const users = await UserRepository.getAll();
    return users;
  }
  async updateUser(id, data, req, res) {

    const { username, email, password } = data;

    const uploadProfile = await cloudinaryConfig.uploader.upload(
      req.file.path
    );


      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await UserRepository.update(id, {
      username,
      email,
      password: encryptedPassword,
      image: uploadProfile.secure_url,
    });

    return user;

  }

}


module.exports = new UserService();

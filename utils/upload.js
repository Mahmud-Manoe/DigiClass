const cloudinary = require("./cloudinary");
const { InternalServerError } = require("./response");

class UploadImg {
  async cloudinaryImageUploadMethod(file) {
    return new Promise((resolve) => {
      cloudinary.uploader.upload(file, (err, res) => {
        if (err) return new InternalServerError();
        resolve({
          res: res.secure_url,
          id: res.public_id,
        });
      });
    });
  }
}

module.exports = new UploadImg();

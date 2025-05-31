const multer = require("multer");
const path = require("path");
const { NotFound, InternalServerError } = require("./response");
// Multer config
module.exports = multer({
  storage: multer.diskStorage({
    filename: function (req, file, cb) {
      //req.body is empty...
      //How could I get the new_file_name property sent from client here?
      cb(null, file.originalname + '-' + Date.now() + ".pdf");
    }
  }),
  fileFilter: (req, file, cb) => {

    let ext = path.extname(file.originalname);
    if (ext !== ".pdf") {
      cb(new InternalServerError(), false);
      return;
    }

    cb(null, true);

  },
});

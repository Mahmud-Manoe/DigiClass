// const { NotFoundError } = require('../errors');
// const { sendEmail } = require('../libs/email');
class ApplicationController {
  handleGetRoot = (req, res) => {
    res.status(200).json({
      status: 'OK',
      message: 'SIKIS API is up and running!'
    })
  };

  buildPaginationObject(req, count) {
    const { page = 1, page_size = 10 } = req.query;
    const page_count = Math.ceil(count / page_size);
    return {
      page,
      page_count,
      page_size,
      count
    };
  }
}

module.exports = new ApplicationController();

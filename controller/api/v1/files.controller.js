const FileService = require("../../../services/files.service.js");
const { SuccessFetchResponse } = require("../../../utils/response.js");

class BookController {
//     async getBooks(req, res) {
//         try {
//             const data = await BookService.getAll();
//             return SuccessFetchResponse(res, data);
//         } catch (err) {
//             res.status(err.status).send(err);
//         }
//     }

    async getFilesById(req, res) {
        try {
            const id = req.params.id;
            const data = await FileService.getOneById(id);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }

    async updateFilesById(req, res) {
        try {
            const id = req.params.id;
            const data = await FileService.updateBook(id, req.body);
            return SuccessFetchResponse(res, data);
        } catch (err) {
            res.status(err.status).send(err);
        }
    }


}
module.exports = new BookController();

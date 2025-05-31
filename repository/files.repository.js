const models = require("../models/index");
const { InternalServerError } = require("../utils/response.js");

class BookRepository {
//     async getAll() {
//         try {
//             const Book = await models.books.findAll({

//             });
//             return Book;
//         } catch (err) {
//             throw new InternalServerError();
//         }
//     }

    async getOneById(id) {
        try {
            const Book = await models.File.findOne({
                where: { file_id: id },
            });
            return Book;
        } catch (err) {
            throw new InternalServerError();
        }
    }

//     async getOneByMaterialId(id) {
//         try {
//             const Book = await models.books.findOne({
//                 where: { materials_id: id },
//                 include: [
//                     {
//                         model: models.materials,
//                     },
//                 ]


//             });
//             return Book;
//         } catch (err) {
//             throw new InternalServerError();
//         }
//     }
    async store(data) {
        try {
            const file = await models.File.create(data);
            const file2 = await models.File.findOne({
                where: {
                    file_id: file.file_id,
                },
            });
            return file2;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async update(id, data) {
        try {
            await models.File.update(data, { where: { file_id: id } });
            const book = await models.File.findOne({
                where: {
                    file_id: id,
                },
            });
            return book;
        } catch (err) {
            throw new InternalServerError();
        }
    }

    async deleteFile(id) {
        try {
            // await cloudinary.uploader.destroy(file)
            models.File.destroy({
                where: { file_id: id },
            });
            return { id: parseInt(id) };
        } catch (err) {
            throw new InternalServerError();
        }
    }
}
module.exports = new BookRepository();

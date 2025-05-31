require("dotenv").config();
const cloudinaryConfig = require("../config/cloudinary.config.js");
const FileRepository = require("../repository/files.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class BookService {
    //     async getAll() {
    //         const Book = await BookRepository.getAll();
    //         return Book;
    //     }

    async getOneById(id) {
        const isExists = await FileRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const book = await FileRepository.getOneById(id);
        return book;
    }

    //     async getOneByMaterialId(id) {
    //         const isExists = await BookRepository.getOneByMaterialId(id);
    //         if (!isExists) {
    //             throw new NotFound();
    //         }
    //         const book = await BookRepository.getOneByMaterialId(id);
    //         return book;
    //     }

    //     async createBook(id, req) {

    //         const materials_id = id;
    //         const uploadBook = await cloudinaryConfig.uploader.upload(req.file.path, {
    //             folder: 'Materi',
    //             use_filename: true,
    //             unique_filename: false,
    //         },)

    //         const link_pdf = uploadBook.secure_url;
    //         const cloudinary_id = uploadBook.public_id;
    //         const book = await BookRepository.store({
    //             cloudinary_id,
    //             link_pdf,
    //             materials_id,
    //         });
    //         return book
    //     }

    async updateBook(id, data) {
        const { cloudinary_id, link_pdf } = data
        const isExists = await FileRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }

        const Book = await FileRepository.update(id, {
            cloudinary_id,
            link_pdf,
        });
        return Book;
    }

    //     async deleteBook(id) {
    //         const isExists = await BookRepository.getOneById(id);
    //         if (!isExists) {
    //             throw new NotFound();
    //         }

    //         await cloudinaryConfig.uploader.destroy(isExists.cloudinary_id);

    //         const Book = await BookRepository.deleteBook(id);
    //         return Book;
    //     }
}


module.exports = new BookService();

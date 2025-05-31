require("dotenv").config();
const MaterialRepository = require("../repository/materials.repository.js");
const FileRepository = require("../repository/files.repository.js");
const {
    NotAuthenticated,
    NotFound,
    UserAlreadyExists,
    KelasAlreadyExists
} = require("../utils/response.js");

class MaterialService {
    async getMaterials() {
        const material = await MaterialRepository.getAll();
        return material;
    }
    async getMaterialById(id) {
        const material = await MaterialRepository.getOneById(id);
        return material;
    }
    async getMaterialByclassId(id) {
        const material = await MaterialRepository.getAllByClassId(id);
        return material;
    }
    async createMaterial(id, data) {
        const class_id = id;
        const { material_name, material_content, cloudinary_id, link_pdf } = data
        const file = await FileRepository.store({
            cloudinary_id,
            link_pdf
        })
        const material = await MaterialRepository.store({
            material_name,
            material_content,
            class_id,
            file_id: file.file_id
        });
        return material;
    }

    async updateMaterial(material_id, data) {

        const { material_name, material_content, cloudinary_id, link_pdf } = data
        const isExists = await MaterialRepository.getOneById(material_id);
        if (!isExists) {
            throw new NotFound();
        }
        const Material = await MaterialRepository.update(material_id, {
            material_name,
            material_content
        });
        await FileRepository.update(isExists.file_id, {
            cloudinary_id,
            link_pdf
        })

        return Material;
    }

    async deleteMaterial(id) {
        const isExists = await MaterialRepository.getOneById(id);
        if (!isExists) {
            throw new NotFound();
        }
        const material = await MaterialRepository.deleteMaterial(id);
        await FileRepository.deleteFile(isExists.file_id)

        return material;
    }
}


module.exports = new MaterialService();

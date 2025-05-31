"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hapus constraint lama jika ada (gunakan nama constraint yang sesuai jika berbeda)
    try {
      await queryInterface.removeConstraint("accumulated_score", "accumulated_score_class_id_fkey");
    } catch (error) {
      console.warn("Constraint mungkin tidak ada, lanjut menambahkan constraint baru.");
    }

    // Tambahkan foreign key baru dengan ON DELETE dan ON UPDATE CASCADE
    await queryInterface.addConstraint("accumulated_score", {
      fields: ["class_id"],
      type: "foreign key",
      name: "accumulated_score_class_id_fkey",
      references: {
        table: "classes",
        field: "class_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Hapus constraint CASCADE
    await queryInterface.removeConstraint("accumulated_score", "accumulated_score_class_id_fkey");

    // Tambahkan kembali tanpa CASCADE jika ingin rollback
    await queryInterface.addConstraint("accumulated_score", {
      fields: ["class_id"],
      type: "foreign key",
      name: "accumulated_score_class_id_fkey",
      references: {
        table: "classes",
        field: "class_id",
      },
      onDelete: "RESTRICT", // Bisa disesuaikan
      onUpdate: "CASCADE",
    });
  },
};
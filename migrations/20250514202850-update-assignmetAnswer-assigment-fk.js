"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Hapus constraint lama jika ada (gunakan nama constraint yang sesuai jika berbeda)
    try {
      await queryInterface.removeConstraint("assignment_answers", "assignment_answers_assignment_id_fkey");
    } catch (error) {
      console.warn("Constraint mungkin tidak ada, lanjut menambahkan constraint baru.");
    }

    // Tambahkan foreign key baru dengan ON DELETE dan ON UPDATE CASCADE
    await queryInterface.addConstraint("assignment_answers", {
      fields: ["assignment_id"],
      type: "foreign key",
      name: "assignment_answers_assignment_id_fkey",
      references: {
        table: "assignments",
        field: "assignment_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Hapus constraint CASCADE
    await queryInterface.removeConstraint("assignment_answers", "assignment_answers_assignment_id_fkey");

    // Tambahkan kembali tanpa CASCADE jika ingin rollback
    await queryInterface.addConstraint("assignment_answers", {
      fields: ["assignment_id"],
      type: "foreign key",
      name: "assignment_answers_assignment_id_fkey",
      references: {
        table: "assignments",
        field: "assignment_id",
      },
      onDelete: "RESTRICT", // Bisa disesuaikan
      onUpdate: "CASCADE",
    });
  },
};
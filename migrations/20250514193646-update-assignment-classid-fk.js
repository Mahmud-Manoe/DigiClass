'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Tambah foreign key baru dengan CASCADE
    await queryInterface.addConstraint("assignments", {
      fields: ["class_id"],
      type: "foreign key",
      name: "assignments_class_id_fkey", // Gunakan nama baru atau sesuai yang ditemukan
      references: {
        table: "classes",
        field: "class_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  async down(queryInterface, Sequelize) {
    // Hapus constraint yang baru
    await queryInterface.removeConstraint("assignments", "assignments_class_id_fkey");
  },
};
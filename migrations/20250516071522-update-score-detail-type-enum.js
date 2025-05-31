"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 1. Rename enum lama (jika perlu)
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_score_detail_type" RENAME TO "enum_score_detail_type_old";
    `);

    // 2. Buat enum baru
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_score_detail_type" AS ENUM ('absen', 'tugas', 'uts', 'uas');
    `);

    // 3. Ubah kolom "type" agar menggunakan enum baru
    await queryInterface.sequelize.query(`
      ALTER TABLE "score_detail"
      ALTER COLUMN "type" TYPE "enum_score_detail_type"
      USING "type"::text::"enum_score_detail_type";
    `);

    // 4. Hapus enum lama setelah kolom berhasil diubah
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_score_detail_type_old";
    `);
  },

  down: async (queryInterface, Sequelize) => {
    // 1. Buat enum lama
    await queryInterface.sequelize.query(`
      CREATE TYPE "enum_score_detail_type_old" AS ENUM ('absen', 'tugas', 'ujian');
    `);

    // 2. Ubah kembali kolom "type"
    await queryInterface.sequelize.query(`
      ALTER TABLE "score_detail"
      ALTER COLUMN "type" TYPE "enum_score_detail_type_old"
      USING "type"::text::"enum_score_detail_type_old";
    `);

    // 3. Hapus enum baru
    await queryInterface.sequelize.query(`
      DROP TYPE "enum_score_detail_type";
    `);

    // 4. Rename kembali enum lama
    await queryInterface.sequelize.query(`
      ALTER TYPE "enum_score_detail_type_old" RENAME TO "enum_score_detail_type";
    `);
  }
};
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('classes', 'format_absen', {
      type: Sequelize.ENUM('harian', 'pertemuan'),
      allowNull: true,
    });

    await queryInterface.addColumn('classes', 'format_nilai', {
      type: Sequelize.ENUM('detail', 'rekap'),
      allowNull: true,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('classes', 'format_absen');
    await queryInterface.removeColumn('classes', 'format_nilai');

    // Hapus ENUM dari database Postgres (jika ingin benar-benar bersih)
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_classes_format_absen";');
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_classes_format_nilai";');
  }
};
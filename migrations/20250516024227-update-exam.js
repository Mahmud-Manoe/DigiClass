"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_exam_type";');
    await queryInterface.addColumn("exam", "type", {
      type: Sequelize.ENUM("uh", "uts", "uas"),
      allowNull: true, // sesuaikan jika kamu ingin default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("exam", "type");
  }
};
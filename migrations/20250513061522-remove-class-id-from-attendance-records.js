"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("attendance_records", "class_id");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("attendance_records", "class_id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "classes",
        key: "class_id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
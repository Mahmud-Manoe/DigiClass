"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("attendance_session", {
      attendance_session_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      class_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "classes", // Pastikan sesuai dengan nama tabel kelas
          key: "class_id",        // Sesuaikan jika PK berbeda
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      attendance_type: {
        type: Sequelize.ENUM("harian", "pertemuan"),
        allowNull: false,
      },
      date: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      meeting_topic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      meeting_number: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("attendance_session");
  },
};
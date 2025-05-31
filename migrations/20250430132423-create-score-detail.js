'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('score_detail', {
      score_detail_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      accumulated_score_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'accumulated_score',
          key: 'accumulated_score_id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      type: {
        type: Sequelize.ENUM('absen', 'tugas', 'ujian'),
        allowNull: false
      },
      item_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      student_score: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      question_score: {
        type: Sequelize.INTEGER,
        defaultValue: 100
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('score_detail');
  }
};
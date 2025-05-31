
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('announcement', 'user_id', {
      type: Sequelize.INTEGER,
      allowNull: true, // atau false jika wajib
      references: {
        model: 'users', // sesuaikan dengan nama tabel User kamu
        key: 'user_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('announcement', 'user_id');
  }
};
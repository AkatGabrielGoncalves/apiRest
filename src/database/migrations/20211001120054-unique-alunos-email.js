module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.changeColumn('alunos', 'email', {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    });
  },

  down: async (queryInterface, DataTypes) => {
    await queryInterface.changeColumn('alunos', 'email', {
      type: DataTypes.STRING,
      allowNull: false,
    });
  },
};

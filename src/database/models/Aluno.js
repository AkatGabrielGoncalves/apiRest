import Sequelize, { Model } from 'sequelize';

export default class Aluno extends Model {
  static init = (sequelize) => {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        sobrenome: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        idade: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        peso: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
        altura: {
          type: Sequelize.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
      }
    );
  };
}

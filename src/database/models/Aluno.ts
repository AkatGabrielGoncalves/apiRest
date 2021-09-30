import { DataTypes, Model, Sequelize } from 'sequelize';

export interface AlunoAttributes {
  id?: number;
  nome: string;
  sobrenome: string;
  email: string;
  idade: number;
  peso: number;
  altura: number;
}

export default class Aluno
  extends Model<AlunoAttributes>
  implements AlunoAttributes
{
  public id!: number;

  public nome!: string;

  public sobrenome!: string;

  public email!: string;

  public idade!: number;

  public peso!: number;

  public altura!: number;

  static initialize = (sequelize: Sequelize) => {
    this.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sobrenome: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        idade: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        peso: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        altura: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: 'alunos',
      }
    );
  };
}

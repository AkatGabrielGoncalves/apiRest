import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import { dialect } from '../../config/database';

export interface IUserAttributes {
  id?: number;
  nome: string;
  email: string;
  password?: string;
  tempPassword: string;
}

export default class User extends Model<IUserAttributes> implements IUserAttributes {
  public id!: number;

  public nome!: string;

  public email!: string;

  public password!: string;

  public tempPassword!: string;

  static initialize = (sequelize: Sequelize) => {
    this.init(
      {
        nome: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [1, 255],
              msg: 'O nome tem tamanho de até 255 caracteres.',
            },
            notNull: {
              msg: 'O nome não pode ser nulo',
            },
          },
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: {
            name: dialect === 'mysql' ? 'users.email' : 'email',
            msg: 'Email já cadastrado.',
          },
          validate: {
            len: {
              args: [6, 255],
              msg: 'O email precisa ter de 6 a 255 caracteres.',
            },
            isEmail: {
              msg: 'A entrada precisa ser um email válido.',
            },
            notNull: {
              msg: 'O email não pode ser nulo',
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          defaultValue: '',
          allowNull: false,
          validate: {
            notNull: {
              msg: 'A senha não pode ser nula',
            },
          },
        },
        tempPassword: {
          type: DataTypes.VIRTUAL,
          allowNull: false,
          validate: {
            len: {
              args: [6, 50],
              msg: 'A senha precisa ter de 6 a 50 caracteres.',
            },
            notNull: {
              msg: 'A senha não pode ser nula',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'users',
      }
    );

    this.addHook('beforeSave', async (user: User) => {
      // Only hash if we send the tempPassword to the query
      if (user.tempPassword) {
        // eslint-disable-next-line no-param-reassign
        user.password = await bcrypt.hash(user.tempPassword, 11);
      }
    });
  };
}

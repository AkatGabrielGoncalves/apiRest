import Sequelize from 'sequelize';
import database from '../config/database';
import Aluno from './models/Aluno';

class Database extends Sequelize {
  constructor() {
    super(database);
    this.models = [Aluno];
    this.initModels();
  }

  initModels = () => {
    this.models.forEach((model) => {
      model.init(this);
    });
  };
}

export default new Database();

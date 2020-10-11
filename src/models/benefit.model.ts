import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';

class Benefit extends Model {
  public id: string;

  public title: string;

  public description: string;

  public createdAt: Date;

  static associate() {
    // this.hasMany(Cat, {
    //   as: 'cats',
    //   foreignKey: 'categoryId',
    // });
  }
}

Benefit.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
  },
}, {
  sequelize,
  modelName: 'BENEFIT',
  updatedAt: false,
});

export default Benefit;

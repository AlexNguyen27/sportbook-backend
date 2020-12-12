import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import { BENEFIT_STATUS } from '../components/constants';

const benefitStatus: any = Object.values(BENEFIT_STATUS);

class Benefit extends Model {
  public id: number;

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
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    unique: true,
  },
  createdAt: {
    type: DataTypes.DATEONLY,
  },
  status: {
    type: DataTypes.ENUM(benefitStatus),
    allowNull: false,
    defaultValue: BENEFIT_STATUS.enabled
  },
}, {
  sequelize,
  modelName: 'BENEFIT',
  updatedAt: false,
});

export default Benefit;

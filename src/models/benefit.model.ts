import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import { BENEFIT_STATUS } from '../components/constants';
import GroundBenefit from './groundBenefit.model';

const benefitStatus: any = Object.values(BENEFIT_STATUS);

class Benefit extends Model {
  public id: number;

  public title: string;

  public description: string;

  public createdAt: Date;

  public status: string;

  static associate() {
    this.hasMany(GroundBenefit, {
      as: 'groundBenefits',
      foreignKey: 'benefitId',
    });
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

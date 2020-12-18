import { Model, DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

import Ground from './ground.model';
import Benefit from './benefit.model';

class GroundBenefit extends Model {
  public benefitId: string;

  public groundId: string;

  static associate() {
    this.belongsTo(Benefit, {
      as: 'benefit',
      foreignKey: 'benefitId',
    });
    this.belongsTo(Ground, {
      as: 'ground',
      foreignKey: 'groundId',
    });
  }
}

GroundBenefit.init({
  benefitId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    references: {
      model: 'BENEFIT',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  groundId: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'GROUND',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
}, {
  sequelize,
  modelName: 'GROUND_BENEFIT',
  timestamps: false,
});

export default GroundBenefit;

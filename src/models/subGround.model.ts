import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import { SUB_GROUND_STATUS } from '../components/constants';
import Ground from './ground.model';

const subGroundStatus: any = Object.values(SUB_GROUND_STATUS);

class SubGround extends Model {
  public id: string;

  public type: number;

  public name: string;

  public price: number;

  public discount: number;

  public status: string;

  public groundId: string;

  public createdAt: Date;

  static associate() {
    this.belongsTo(Ground, {
      as: 'ground',
      foreignKey: 'groundId',
    });
  }
}

SubGround.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  type: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 5,
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 0,
    },
  },
  discount: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 0,
      max: 100,
    },
  },
  status: {
    type: DataTypes.ENUM(subGroundStatus),
    allowNull: false,
  },
  groundId: {
    type: DataTypes.UUID,
    allowNull: false,
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
  createdAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'SUB_GROUND',
  updatedAt: false,
});

export default SubGround;

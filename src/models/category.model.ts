import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import Ground from './ground.model';
import { BENEFIT_STATUS } from '../components/constants';

const benefitStatus: any = Object.values(BENEFIT_STATUS);

class Category extends Model {
  public id: string;

  public name: string;

  public createdAt: Date;

  public status: string;

  static associate() {
    this.hasMany(Ground, {
      as: 'grounds',
      foreignKey: 'categoryId',
    });
  }
}

Category.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    validate: {
      notEmpty: true,
    },
    unique: true,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(benefitStatus),
    allowNull: false,
    defaultValue: BENEFIT_STATUS.enabled
  },
  createdAt: {
    type: DataTypes.DATEONLY,
  },
}, {
  sequelize,
  modelName: 'CATEGORY',
  updatedAt: false,
});

export default Category;

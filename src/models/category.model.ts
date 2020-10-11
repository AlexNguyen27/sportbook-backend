import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';

class Category extends Model {
  public id: string;

  public name: string;

  public createdAt: Date;

  static associate() {
    // this.hasMany(Cat, {
    //   as: 'cats',
    //   foreignKey: 'categoryId',
    // });
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

import { Model, DataTypes } from 'sequelize';

import { sequelize } from './sequelize';
import Category from './category.model';
import User from './user.model';
import Rating from './rating.model';
import Comment from './comment.model';
import SubGround from './subGround.model';
import { GROUND_STATUS } from '../components/constants';
import GroundBenefit from './groundBenefit.model';

interface Address {
  regionCode: string;
  wardCode: string;
  address: string;
  districtCode: string;
}

const groundStatus: any = Object.values(GROUND_STATUS);

class Ground extends Model {
  public id: string;

  public title: string;

  public discription: string;

  public phone: string;

  public address: Address;

  public benefit: string;

  public image: string;

  public userId: string;

  public status: string;

  public categoryId: string;

  public createdAt: Date;

  public updatedAt: Date;

  static associate() {
    this.belongsTo(Category, {
      as: 'category',
      foreignKey: 'categoryId',
    });

    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.hasMany(Rating, {
      as: 'ratings',
      foreignKey: 'groundId',
    });

    this.hasMany(SubGround, {
      as: 'subGrounds',
      foreignKey: 'groundId',
    });

    this.belongsToMany(User, {
      foreignKey: 'groundId',
      as: 'ground',
      through: Rating,
    });

    this.hasMany(Comment, {
      as: 'comments',
      foreignKey: 'groundId',
    });

    this.hasMany(GroundBenefit, {
      as: 'groundBenefits',
      foreignKey: 'benefitId',
    });
  }
}

Ground.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: [10, 10],
        msg: 'Phone number must be 10 numbers',
      },
      is: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
    },
  },
  address: {
    type: DataTypes.JSONB,
  },
  benefit: { // TODO FIX LATER
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.JSONB,
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'USER',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  categoryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'CATEGORY',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  status: {
    type: DataTypes.ENUM(groundStatus),
    allowNull: false,
    defaultValue: GROUND_STATUS.public
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'GROUND',
});

export default Ground;

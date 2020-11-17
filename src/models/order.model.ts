import { Model, DataTypes } from 'sequelize';
import moment from 'moment';
import { sequelize } from './sequelize';
import { PAYMENT_TYPE, ORDER_STATUS } from '../components/constants';
import SubGround from './subGround.model';
import User from './user.model';
import History from './history.model';

const paymentTypes: any = Object.values(PAYMENT_TYPE);
const orderStatus: any = Object.values(ORDER_STATUS);

class Order extends Model {
  public id: string;

  public subGroundId: string;

  public userId: string;

  public startDay: string;

  public startTime: string;

  public endTime: string;

  public paymentType: string;

  public status: string;

  public price: number;

  public discount: number;

  public createdAt: Date;

  public updatedAt: Date;

  static associate() {
    this.belongsTo(SubGround, {
      as: 'subGround',
      foreignKey: 'subGroundId',
    });

    this.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId',
    });

    this.hasMany(History, {
      as: 'histories',
      foreignKey: 'orderId',
    });
  }
}

Order.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  subGroundId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'SUB_GROUND',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
    references: {
      model: 'USER',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  startDay: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    get() {
      return moment(this.getDataValue('startDay')).format('DD-MM-YYYY');
    },
  },
  startTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.TIME,
    allowNull: false,
  }, // can count duration later
  paymentType: {
    type: DataTypes.ENUM(paymentTypes),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(orderStatus),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 0,
    },
    allowNull: false,
  },
  discount: {
    type: DataTypes.FLOAT,
    validate: {
      isNumeric: true,
      min: 0,
      max: 100,
    },
    defaultValue: 0,
  },
  createdAt: {
    type: DataTypes.DATE,
  },
  updatedAt: {
    type: DataTypes.DATE,
  },
}, {
  sequelize,
  modelName: 'ORDER',
});

export default Order;

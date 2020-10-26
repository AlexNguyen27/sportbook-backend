import { QueryInterface, DataTypes } from 'sequelize';
import { PAYMENT_TYPE, ORDER_STATUS } from '../components/constants';

const paymentTypes: any = Object.values(PAYMENT_TYPE);
const orderStatus: any = Object.values(ORDER_STATUS);

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('ORDER', {
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
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
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
    uniqueKeys: {
      // eslint-disable-next-line @typescript-eslint/camelcase
      unique_userId_subGroundId_startDay_startTime: {
        fields: ['userId', 'subGroundId', 'startDay', 'startTime'],
      },
    },
    transaction: t,
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('ORDER'),
};
export default migration;

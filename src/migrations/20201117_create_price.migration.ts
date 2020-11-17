import { QueryInterface, DataTypes } from 'sequelize';
import { SUB_GROUND_STATUS } from '../components/constants';

const subGroundStatus: any = Object.values(SUB_GROUND_STATUS);
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('PRICE', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(subGroundStatus),
      allowNull: false,
    },
    subgroundId: {
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
    createdAt: {
      type: DataTypes.DATE,
    },
  }, {
    transaction: t,
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('SUB_GROUND'),
};
export default migration;

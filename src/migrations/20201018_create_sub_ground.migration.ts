import { QueryInterface, DataTypes } from 'sequelize';
import { SUB_GROUND_STATUS } from '../components/constants';

const subGroundStatus: any = Object.values(SUB_GROUND_STATUS);
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('SUB_GROUND', {
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
    transaction: t,
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('SUB_GROUND'),
};
export default migration;

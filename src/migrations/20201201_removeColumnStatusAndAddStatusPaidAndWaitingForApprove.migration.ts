import { QueryInterface, DataTypes } from 'sequelize';
import { SUB_GROUND_STATUS, ORDER_STATUS } from '../components/constants';

const subGroundStatus: any = Object.values(SUB_GROUND_STATUS);

const orderStatus: any = Object.values(ORDER_STATUS);
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.removeColumn('PRICE', 'status', { transaction });
    await queryInterface.removeColumn('ORDER', 'status', { transaction });
    await queryInterface.removeColumn('HISTORY', 'orderStatus', { transaction });

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_ORDER_status";', { transaction });

    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_HISTORY_orderStatus";', { transaction });

    await queryInterface.addColumn('ORDER', 'status', {
      type: DataTypes.ENUM(orderStatus),
      allowNull: false,
    }, { transaction });

    // ADD COLUMN HISTORY STATUS
    await queryInterface.addColumn('HISTORY', 'orderStatus', {
      type: DataTypes.ENUM(orderStatus),
      allowNull: false,
    }, { transaction });
  }),
  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.addColumn('PRICE', 'status', {
      type: DataTypes.ENUM(subGroundStatus),
      allowNull: false,
    }, { transaction });

    await queryInterface.addColumn('ORDER', 'status', {
      type: DataTypes.ENUM(orderStatus),
      allowNull: false,
    }, { transaction });

    await queryInterface.addColumn('HISTORY', 'orderStatus', {
      type: DataTypes.ENUM(orderStatus),
      allowNull: false,
    }, { transaction });
  })
};
export default migration;

import { QueryInterface, DataTypes } from 'sequelize';
import { GROUND_STATUS, USER_STATUS } from '../components/constants';

const groundStatus: any = Object.values(GROUND_STATUS);
const userStatus: any = Object.values(USER_STATUS);
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.addColumn('GROUND', 'status', {
      type: DataTypes.ENUM(groundStatus),
      allowNull: false,
      defaultValue: GROUND_STATUS.public
    }, { transaction });

    await queryInterface.addColumn('SUB_GROUND', 'status', {
      type: DataTypes.ENUM(groundStatus),
      allowNull: false,
      defaultValue: GROUND_STATUS.public
    }, { transaction });

    await queryInterface.addColumn('USER', 'status', {
      type: DataTypes.ENUM(userStatus),
      allowNull: false,
      defaultValue: USER_STATUS.active
    }, { transaction });
  }),

  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.removeColumn('SUB_GROUND', 'status', { transaction });
    await queryInterface.removeColumn('GROUND', 'status', { transaction });
    await queryInterface.removeColumn('USER', 'status', { transaction });
  })
};
export default migration;

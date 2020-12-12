import { QueryInterface, DataTypes } from 'sequelize';
import { BENEFIT_STATUS } from '../components/constants';

const benefitStatus: any = Object.values(BENEFIT_STATUS);
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.removeColumn('BENEFIT', 'description', { transaction });

    await queryInterface.addColumn('BENEFIT', 'status', {
      type: DataTypes.ENUM(benefitStatus),
      allowNull: false,
      defaultValue: BENEFIT_STATUS.enabled
    }, { transaction });
  }),

  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.addColumn('BENEFIT', 'description', {
      type: DataTypes.TEXT,
    }, { transaction });

    await queryInterface.removeColumn('BENEFIT', 'status', { transaction });
  })
};
export default migration;

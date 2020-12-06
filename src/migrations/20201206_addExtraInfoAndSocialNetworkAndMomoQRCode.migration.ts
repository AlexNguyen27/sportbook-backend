import { QueryInterface, DataTypes } from 'sequelize';
import { FAVORITE_FOOT } from '../components/constants';

const favoriteFoot: any = Object.values(FAVORITE_FOOT);
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.addColumn('USER', 'extraInfo', {
      type: DataTypes.JSONB,
    }, { transaction });

    await queryInterface.addColumn('USER', 'socialNetwork', {
      type: DataTypes.JSONB,
    }, { transaction });

    await queryInterface.addColumn('USER', 'momoQRCode', {
      type: DataTypes.TEXT,
    }, { transaction });

    await queryInterface.removeColumn('USER', 'favoriteFoot', { transaction });
    await queryInterface.removeColumn('USER', 'playRole', { transaction });
  }),
  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async transaction => {
    await queryInterface.removeColumn('USER', 'extraInfo', { transaction });
    await queryInterface.removeColumn('USER', 'socialNetwork', { transaction });
    await queryInterface.removeColumn('USER', 'momoQRCode', { transaction });
    await queryInterface.addColumn('USER', 'favoriteFoot', {
      type: DataTypes.ENUM(favoriteFoot),
    }, { transaction });
    await queryInterface.addColumn('USER', 'playRole', {
      type: DataTypes.STRING,
    }, { transaction });
  })
};
export default migration;

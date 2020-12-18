import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.addColumn('GROUND', 'benefit', {
      type: DataTypes.STRING,
      allowNull: false,
    }, { transaction })
  }),

  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.addColumn('GROUND', 'benefit', {
      type: DataTypes.STRING,
      allowNull: false,
    }, { transaction })
    await queryInterface.removeConstraint('PRICE', 'price_unique_constraint', { transaction });
  })
};
export default migration;

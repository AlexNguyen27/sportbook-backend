import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.createTable('GROUND_BENEFIT', {
      groundId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        primaryKey: true,
        references: {
          model: 'GROUND',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      benefitId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        references: {
          model: 'BENEFIT',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    }, { transaction });

    await queryInterface.addConstraint('PRICE', ['startTime', 'endTime', 'subGroundId'], {
      type: 'unique',
      name: 'price_unique_constraint',
      transaction
    })
  }),

  down: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(async (transaction) => {
    await queryInterface.dropTable('GROUND_BENEFIT', { transaction });
    await queryInterface.removeConstraint('PRICE', 'price_unique_constraint', { transaction });
  })
};
export default migration;

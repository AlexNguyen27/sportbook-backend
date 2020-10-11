import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction(() => queryInterface.createTable('RATING', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
      primaryKey: true,
      references: {
        model: 'USER',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
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
    point: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isNumeric: true,
        max: 5,
        min: 0,
      },
    },
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('RATING'),
};
export default migration;

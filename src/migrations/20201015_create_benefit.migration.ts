import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('BENEFIT', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
      unique: true,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
  }, {
    transaction: t,
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('BENEFIT'),
};

export default migration;

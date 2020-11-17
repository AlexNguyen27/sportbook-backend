import { QueryInterface, DataTypes } from 'sequelize';

const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('SUB_GROUND', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    numberOfPlayers: {
      type: DataTypes.FLOAT,
      validate: {
        isNumeric: true,
        min: 5,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // vd: 5 nguoi, 7 nguoi
    },
    // 0 = Monday, 1 = Tuesday, 2 = Wednesday, 3 = Thursday, 4 = Friday, 5 = Saturday, 6 = Sunday.
    // activeWeekDays: {
    //   type: DataTypes.JSONB,
    //   allowNull: false,
    // },
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

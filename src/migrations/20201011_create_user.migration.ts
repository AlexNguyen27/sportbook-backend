import { QueryInterface, DataTypes } from 'sequelize';
import { ROLE, GENDER, FAVORITE_FOOT } from '../components/constants';

const genderType: any = Object.values(GENDER);
const role: any = Object.values(ROLE);
const favoriteFoot: any = Object.values(FAVORITE_FOOT);
const migration = {
  up: (queryInterface: QueryInterface) => queryInterface.sequelize.transaction((t) => queryInterface.createTable('USER', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.TEXT,
      validate: {
        isEmail: true,
      },
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      validate: {
        is: /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/im,
      },
    },
    gender: {
      type: DataTypes.ENUM(genderType),
      allowNull: true,
    },
    address: {
      type: DataTypes.JSONB,
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [6, 225],
          msg: 'Password must be more than 6 characters',
        },
      },
    },
    avatar: {
      type: DataTypes.TEXT,
    },
    favoriteFoot: {
      type: DataTypes.ENUM(favoriteFoot),
    },
    playRole: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM(role),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    transaction: t,
  })),
  down: (queryInterface: QueryInterface) => queryInterface.dropTable('USER'),
};

export default migration;

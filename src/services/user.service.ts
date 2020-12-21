import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import moment from 'moment'
import UserModel from '../models/user.model';
import config from '../components/config';
import { AuthenticationError, ExistsError, BusinessError } from '../components/errors';
import { User, MutationCreateUserArgs, MutationUpdateUserArgs } from '../types/graphql.type';

import { ROLE, ORDER_STATUS, USER_STATUS } from '../components/constants';
import Order from '../models/order.model';
import Ground from '../models/ground.model';
import { sequelize } from '../models/sequelize';
import SubGround from '../models/subGround.model';

const { Op } = require('sequelize');

class UserService {
  static async getUsers(filter: any, user: any): Promise<User[]> {
    let whereCondition = {};

    // GET LOYAL CUSTOMER
    if (filter.weekday) {
      const condtion: any = {
        [Op.and]: [
          { status: [ORDER_STATUS.paid, ORDER_STATUS.finished] },
          sequelize.Sequelize.where(
            sequelize.Sequelize.literal('to_char("orders"."startDay", \'day\')'),
            { [Op.like]: `%${filter.weekday}%` }
          )
        ]
      }
      const userList = await UserModel.findAll({
        attributes: ['id', 'email', 'firstName', 'lastName', 'phone',
        ],
        include: [
          {
            model: Order,
            attributes: ['status', 'createdAt', 'startDay', 'id'],
            as: 'orders',
            where: {
              ...condtion
            },
            include: [
              {
                model: SubGround,
                as: 'subGround',
                required: true,
                attributes: [],
                include: [
                  {
                    model: Ground,
                    as: 'ground',
                    required: true,
                    attributes: [],
                    where: {
                      userId: user.id // id owner
                    }
                  }
                ]
              }
            ]
          },
        ]
      });
      return userList;
    }
    // get user with role for admin
    if (filter && filter.role && filter.role === ROLE.user) {
      whereCondition = {
        ...filter,
      };
    } else {
      // manager management with role owner and admin
      whereCondition = {
        role: {
          [Op.in]: [ROLE.admin, ROLE.owner],
        },
      };
    }

    return UserModel.findAll({
      where: {
        ...whereCondition,
      },
    });
  }

  static async login(data: any) {
    const { email, password } = data;
    const user: any = await UserModel.findOne({ where: { email } });

    //  ONLY CAN LOGIN ACTIVE USER
    if (!user || (user && user.status === USER_STATUS.disabled)) {
      throw new AuthenticationError('Email or password incorrect!');
    }

    if (!data.hashPassword) {
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new AuthenticationError('Email or password is incorrect!');
      }
    } else {
      // compare user with hash password
      const isMatch = data.hashPassword === user.password;
      if (!isMatch) {
        throw new AuthenticationError('Hash password is incorrect!');
      }
    }

    const { id, role } = user;
    const { secretKey } = config.jwt;
    const payload = {
      id,
      userId: user.id,
      role,
    };

    // todo : add expired token
    const token = jwt.sign(payload, secretKey, { algorithm: 'HS256' });
    return {
      token,
      ...user.toJSON(),
    };
  }

  static async register(data: MutationCreateUserArgs) {
    const { password, ...userData } = data;

    if (password.trim().length < 6 || password.trim().length > 42) {
      throw new AuthenticationError('Password must be more than 6 and 42 characters');
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({ password: hashPassword, ...userData });

    return {
      ...newUser.toJSON(),
    };
  }

  static getUserInfo(id: string, user: any) {
    // only admin can get other user info
    // manager can only get their info
    if (user.role === ROLE.owner && user.id !== id) {
      throw new AuthenticationError('Your role is not allowed');
    }

    return UserModel.findOne({ where: { id } }).then((item) => {
      if (!item) throw new ExistsError('User not found');
      return { ...item.toJSON() };
    });
  }

  static findUserById(id: string) {
    // only admin can get other user info
    // manager can only get there info
    return UserModel.findOne({ where: { id } }).then((user) => {
      if (!user) throw new ExistsError('User not found');
      return { ...user.toJSON() };
    });
  }

  // DONT NEED TO CHECK CUZ LOGIN WILL THROW ERROR
  static checkExitsEmail(filter: any) {
    return UserModel.findOne({ where: { email: filter.email } }).then((user) => {
      if (!user) {
        return {
          status: false,
          hashPassword: '',
        };
      }

      return {
        status: true,
        hashPassword: user.password
      };
    });
  }

  static async updateUser(userInfo: MutationUpdateUserArgs, user: any) {
    // IF HAS DATA ID THEN UPDATE USER ID
    // ELSE UPDATE TOKEN USER ID
    const userId = userInfo.id || user.id;

    // only admin can edit role
    if ((userInfo.role || (userInfo.id && userInfo.id !== user.userId)) && user.role === 'user') {
      throw new AuthenticationError('Your role is not allowed');
    }

    // ONLY ADMIN CAN UPDATE STATUS
    if (userInfo.status && user.role !== ROLE.admin) {
      throw new AuthenticationError('Your role is not allowed');
    }

    const userData: any = await this.findUserById(userId);
    if (userData.email === userInfo.email) {
      // eslint-disable-next-line no-param-reassign
      delete userInfo.email;
    }

    const formatedUserInfo: any = { ...userInfo };
    if (userInfo.phone) {
      const {
        regionCode, districtCode, wardCode
      } = userInfo;
      formatedUserInfo.address = JSON.stringify({
        regionCode,
        districtCode,
        wardCode,
        address: userInfo.address,
      });
      formatedUserInfo.dob = moment(userInfo.dob, 'DD-MM-YYYY');
    }

    formatedUserInfo.extraInfo = JSON.stringify({
      ...userInfo.extraInfo,
    });

    formatedUserInfo.socialNetwork = JSON.stringify({
      ...userInfo.socialNetwork,
    });

    await UserModel.update(formatedUserInfo, { where: { id: userId }, returning: true });
    const currentUser = await this.findUserById(userId);
    return currentUser;
  }

  // TODO: CAN NOT DELETE USER
  static async deleteUser(id: string, user: any) {
    const { role } = user;
    // only admin can delete user
    if (role !== ROLE.admin) {
      throw new AuthenticationError('Your role is not allowed!');
    }
    const currentUser = await UserModel.findOne({ where: { id } });
    if (!currentUser) {
      throw new ExistsError('User not found');
    }
    await UserModel.destroy({ where: { id } });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }

  static async uploadAvatar(data: any, user: any) {
    const { avatar } = data;
    // ADMIN CAN UPLOAD IMAGE OF USER
    // IF NOT ADMIN AND PASSING USER ID => PASSED
    if (user.role === ROLE.admin && data.userId) {
      await UserModel.update({ avatar }, { where: { id: data.userId }, returning: true });
      const editedUser = await this.findUserById(data.userId);
      return editedUser;
    }

    // GET USER ID FROM TOKEN
    await UserModel.update({ avatar }, { where: { id: user.id }, returning: true });
    const currentUser = await this.findUserById(user.id);
    return currentUser;
  }

  static async uploadMomoQRCode(data: any, user: any) {
    const { momoQRCode } = data;

    // GET USER ID FROM TOKEN
    await UserModel.update({ momoQRCode }, { where: { id: user.id }, returning: true });
    const currentUser = await this.findUserById(user.id);
    return currentUser;
  }

  static async changePassword(data: any, user: any) {
    const {
      id: userId, currentPassword, newPassword, confirmPassword,
    } = data;

    // ADMIN CAN UPDATE PASSWORD USER
    if (userId && user.role !== ROLE.admin) {
      throw new AuthenticationError('Your role is not allowed!');
    }

    // ADMIN => USERID OR TOKEN ID
    // USER => TOKEN ID
    const id = user.role === ROLE.admin ? userId || user.id : user.id;

    const userData: any = await this.findUserById(id);

    const match = await bcrypt.compare(currentPassword, userData.password);
    if (!match) {
      throw new AuthenticationError('Current password is incorrect!');
    }

    if (newPassword.trim().length < 6 || newPassword.trim().length > 42) {
      throw new BusinessError('Password must be more than 6 and 42 characters');
    }
    if (newPassword !== confirmPassword) {
      throw new BusinessError('Confirm password did not match!');
    }
    const hashPassword = await bcrypt.hash(newPassword, 10);
    // ALREADY CATCH ERROR AT MODEL WHEN PASSWORD TO SHORT
    await UserModel.update({ password: hashPassword }, { where: { id } });
    return {
      status: 200,
      message: 'Change password successfully',
    };
  }
}

export default UserService;

import moment from 'moment';
import OrderModel from '../models/order.model';
import User from '../models/user.model';
import { ExistsError, BusinessError } from '../components/errors';
import { Order, MutationCreateOrderArgs, MutationUpdateOrderStatusArgs } from '../types/graphql.type';
import UserService from './user.service';
import SubGroundService from './subGround.service';
import { ROLE, ORDER_STATUS } from '../components/constants';
import SubGround from '../models/subGround.model';
import { sequelize } from '../models/sequelize';
import History from '../models/history.model';
import Ground from '../models/ground.model';

const { Op } = require('sequelize');

class OrderService {
  static async getOrderById(id: any, user: any) {
    // user => only get it own
    // owner get can get order detail of it ground
    let order: any;
    try {
      order = await OrderModel.findOne({
        where: {
          id,
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone', 'address', 'avatar']
          },
          {
            model: SubGround,
            as: 'subGround',
            include: [
              {
                model: Ground,
                as: 'ground',
                attributes: ['id', 'title', 'address', 'benefit', 'phone'],
                include: [
                  {
                    model: User,
                    as: 'user',
                    attributes: ['firstName', 'lastName', 'email', 'phone']
                  }
                ]
              }
            ]
          },
          {
            model: History,
            as: 'histories',
            attributes: ['createdAt', 'orderStatus'],
            order: [
              ['createdAt', 'ASC'],
            ]
          },
        ],
      });
      return { ...order.toJSON() };
    } catch (error) {
      if (!order) throw new ExistsError('Order not found');
      throw error;
    }
  }

  static getOrdersBySubGroundId({ subGroundId }: any): Promise<Order[]> {
    // todo get user id in token
    return OrderModel.findAll({
      where: {
        subGroundId,
      },
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: SubGround,
          as: 'subGround',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  static getOrders(filter: any, user: any) {
    // IF ROLE OWNER OR ADMIN => GET ALL ORDER OF THE GROUND
    // IF ROLE USER GET ONLY ORDER OF THAT USER ID
    // GETTING ORDER FOR USER
    if (user.role === ROLE.user) {
      // all these field will pass on input
      const { status, fromDate, toDate } = filter;
      let whereCondtionUser: any = {
        [Op.and]: [
          { status },
          {
            createdAt: {
              [Op.gte]: moment(fromDate).startOf('day').subtract(1, 'days'),
              [Op.lte]: moment(toDate).startOf('day').add(1, 'days'),
            }
          }
        ]
      };

      // USER: ORDER HISTORY
      if (status === 'all') {
        whereCondtionUser = {
          createdAt: {
            [Op.gte]: moment(fromDate).startOf('day').subtract(1, 'days'),
            [Op.lte]: moment(toDate).startOf('day').add(1, 'days'),
          }
        };
      }

      return OrderModel.findAll({
        where: {
          userId: user.id,
          ...whereCondtionUser,
        },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: SubGround,
            as: 'subGround',
          },
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    }
    if (user.role === ROLE.owner) {
      let ownerWhereCondition = {};
      if (filter.userId) {
        ownerWhereCondition = {
          ...filter,
          userId: filter.userId,
        };
      }

      return OrderModel.findAll({
        where: {
          ...ownerWhereCondition,
        },
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
          },
          {
            model: SubGround,
            as: 'subGround',
            required: true,
            include: [
              {
                model: Ground,
                as: 'ground',
                attributes: ['id', 'title'],
                required: true,
                where: {
                  userId: user.id
                }
              }
            ]
          },
        ],
        order: [
          ['createdAt', 'DESC'],
        ],
      });
    }

    return OrderModel.findAll({
      include: [
        {
          model: User,
          as: 'user',
        },
        {
          model: SubGround,
          as: 'subGround',
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  static async findOrderById({ id }: { id: any }) {
    let order: any;
    try {
      order = await OrderModel.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: SubGround,
            as: 'subGround',
          },
        ],
      });
      return { ...order.toJSON() };
    } catch (error) {
      if (!order) throw new ExistsError('Order not found');
      throw error;
    }
  }

  static async checkExitsOrder({
    startDay,
    startTime,
    endTime,
    subGroundId
  }: any) {
    let order: any;
    try {
      order = await OrderModel.findOne({
        where: {
          status: [ORDER_STATUS.approved, ORDER_STATUS.paid],
          subGroundId,
          startDay,
          startTime,
          endTime
        }
      });
      if (!order) return false;
      return true; // EXITS
    } catch (error) {
      if (!order) return false; // NOT FOUND
    }
  }

  static async checkExitsOthersOrder({
    startDay,
    startTime,
    endTime,
    subGroundId,
    orderId,
  }: any) {
    let order: any;
    try {
      order = await OrderModel.findOne({
        where: {
          status: [ORDER_STATUS.approved, ORDER_STATUS.paid],
          subGroundId,
          startDay,
          startTime,
          endTime,
          id: {
            [Op.not]: orderId
          }
        }
      });
      if (!order) return false;
      return true; // EXITS
    } catch (error) {
      console.log('checkExitsOrder-------------------', error)
      if (!order) return false; // NOT FOUND
    }
  }

  // ADMIN CAN NOT CREATE GROUND FOR OTHER ROLES
  static async createOrder(data: MutationCreateOrderArgs, userId: any): Promise<Order> {
    const {
      subGroundId, startDay, endTime, startTime
    }: any = data;

    const formatStartDay = moment(startDay, 'DD/MM/YYYY');
    // CHECK IF USER AND CATEGORY EXITS
    await UserService.findUserById(userId);
    await SubGroundService.findSubGroundById({ id: subGroundId });

    const isExitOrder = await this.checkExitsOrder({
      startDay: formatStartDay,
      startTime,
      endTime,
      subGroundId
    });

    if (isExitOrder) {
      throw new BusinessError('Same order is waiting for approve or waiting for paid!');
    }
    const formatedData: any = { ...data, startDay: formatStartDay, status: ORDER_STATUS.waiting_for_approve };
    formatedData.histories = {
      orderStatus: ORDER_STATUS.waiting_for_approve,
    };
    const newOrder = await OrderModel.create({ ...formatedData, userId, status: ORDER_STATUS.waiting_for_approve }, {
      include: [{
        model: History,
        as: 'histories',
      }],
    });

    // TODO
    // SET REDIS KEY AND TIME OUT HERE
    // KEY : ORDER ID
    // VALUE: ORDER STATUS WAITING FOR APPROVE
    //


    return this.findOrderById({ id: newOrder.id });
  }

  // todo: DONT NEED TO UPDATE ORDER
  static async updateOrder(data: any, user: any) {
    const { id, subGroundId } = data;
    // const { userId } = user;
    // const order = await this.findOrderById({ id });

    // if (order.userId !== userId) {
    //   throw new AuthenticationError('Your role is not allowed');
    // }

    await SubGroundService.findSubGroundById({ id: subGroundId });

    await OrderModel.update({ ...data }, { where: { id } });

    const updatedGround = await this.findOrderById({ id });
    return updatedGround;
  }

  // ONWER CAN ONLY UPDATE STATUS OF THEIR OWN
  static async updateStatus(data: MutationUpdateOrderStatusArgs, user: any) {
    const transaction = await sequelize.transaction();

    const { id } = data;
    const order = await this.findOrderById({ id });

    const formatOrder: any = { ...order };
    // Check if has order status been approved or paid of this order subground
    const {
      subGroundId, startTime, startDay, endTime
    } = formatOrder;

    // TODO: WHEN MANAGER CHECKOUT 1 STATUS IS APPROVED THEN OTHERS STATUS SHOULD BE CANCELLED
    // FIND ALL AND UPDATE BUCK
    if (formatOrder.status === ORDER_STATUS.waiting_for_approve) {
      const isExitOrder = await this.checkExitsOthersOrder({
        subGroundId,
        startDay: moment(startDay, 'DD/MM/YYYY'),
        startTime,
        endTime,
        orderId: id,
      });
      if (isExitOrder && data.status === ORDER_STATUS.approved) {
        throw new BusinessError('Same order is waiting for approve or waiting for paid!');
      }
    }

    if (user.role === ROLE.owner) {
      // CHECK  SUBGROUND OWNER ID
      const isExitsSubGround = SubGround.findOne({
        where: {
          id: order.subGroundId,
        },
        include: [
          {
            model: Ground,
            as: 'ground',
            where: {
              userId: user.id
            }
          }
        ]
      });

      if (!isExitsSubGround) {
        throw new BusinessError('Can not update order status!');
      }
    }
    // CAN'T CHANGE STATUS IF ORDER APPROVED
    if (order.status === ORDER_STATUS.finished) {
      throw new BusinessError('Order has been finished!');
    }

    try {
      await OrderModel.update(data, { where: { id }, transaction });
      await History.create({
        orderId: id,
        orderStatus: data.status,
      }, { transaction });
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
    }

    return {
      status: 200,
      message: 'Updated successfully',
    };
  }
}

export default OrderService;

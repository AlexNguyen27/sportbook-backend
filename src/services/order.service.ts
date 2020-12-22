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
import { redis } from '../components/redis';
import HistoryService from './history.service';

const { Op } = require('sequelize');

const { Sequelize } = sequelize;
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
    const orderStatus = [Sequelize.literal(`
        CASE
        WHEN "ORDER"."status" = '${ORDER_STATUS.waiting_for_approve}' THEN 0
        WHEN "ORDER"."status" = '${ORDER_STATUS.approved}' THEN 1
        WHEN "ORDER"."status" = '${ORDER_STATUS.paid}' THEN 2
        WHEN "ORDER"."status" = '${ORDER_STATUS.cancelled}' THEN 3
        WHEN "ORDER"."status" = '${ORDER_STATUS.finished}' THEN 4
        END ASC
    `)]
    // if (user.role === ROLE.user) {
    //   // all these field will pass on input
    //   const { status, fromDate, toDate } = filter;
    //   let whereCondtionUser: any = {
    //     [Op.and]: [
    //       { status },
    //       {
    //         createdAt: {
    //           [Op.gte]: moment(fromDate).startOf('day').add(7, 'hours'),
    //           [Op.lte]: moment(toDate).endOf('day').add(7, 'hours'),
    //         }
    //       }
    //     ]
    //   };

    //   // USER: ORDER HISTORY
    //   if (status === 'all') {
    //     whereCondtionUser = {
    //       createdAt: {
    //         [Op.gte]: moment(fromDate).startOf('day').add(7, 'hours'), // todo TESTING THIS
    //         [Op.lte]: moment(toDate).endOf('day').add(7, 'hours'),
    //       }
    //     };
    //   }

    //   return OrderModel.findAll({
    //     where: {
    //       userId: user.id,
    //       ...whereCondtionUser,
    //     },
    //     include: [
    //       {
    //         model: SubGround,
    //         as: 'subGround',
    //         attributes: ['id', 'name'],
    //         required: true,
    //         include: [
    //           {
    //             model: Ground,
    //             as: 'ground',
    //             attributes: ['id', 'title'],
    //             required: true,
    //           }
    //         ]
    //       },
    //     ],
    //     order: [
    //       ...orderStatus,
    //       ['createdAt', 'DESC'],
    //     ],
    //   });
    // }

    // FOR OWNER
    let userCondition = {};
    let statusCondition = {};
    let createdAtCondtion = {};

    // GET ALL ORDER OF THE USER ON LOYAL CUSTOMER
    // FOR OWNER
    if (filter.userId && ROLE.owner === user.role) {
      userCondition = {
        status: [ORDER_STATUS.paid, ORDER_STATUS.finished],
        userId: filter.userId
      };
    }

    const {
      status, fromDate, toDate, startDay
    } = filter;
    console.log('fitler----------------', filter);
    if (status && status !== 'all') {
      statusCondition = {
        status
      }
    }

    if (fromDate) {
      createdAtCondtion = {
        [Op.and]: [
          {
            createdAt: {
              [Op.gte]: moment(fromDate).add(7, 'hours').format(),
            }
          }
        ]
      }
    }
    if (fromDate && toDate) {
      createdAtCondtion = {
        [Op.and]: [
          {
            createdAt: {
              [Op.gte]: moment(fromDate).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss'),
              [Op.lte]: moment(toDate).add(7, 'hours').format('YYYY-MM-DD HH:mm:ss'),
            }
          }
        ]
      }
    }

    // return OrderModel.findAll({

    //   include: [
    //     {
    //       model: User,
    //       as: 'user',
    //       attributes: ['id', 'firstName', 'lastName', 'email', 'phone']
    //     },
    //     {
    //       model: SubGround,
    //       as: 'subGround',
    //       required: true,
    //       include: [
    //         {
    //           model: Ground,
    //           as: 'ground',
    //           attributes: ['id', 'title'],
    //           required: true,
    //           where: {
    //             userId: user.id
    //           }
    //         }
    //       ]
    //     },
    //   ],
    //   order: [
    //     ...orderStatus,
    //     ['createdAt', 'DESC'],
    //   ],
    // });

    let isOwner = {};
    let isUser = {};
    let startDayCondition = {};

    if (user.role === ROLE.user) {
      isUser = {
        userId: user.id,
      }
    }
    if (ROLE.owner === user.role) {
      isOwner = {
        userId: user.id
      }
      if (startDay) {
        startDayCondition = {
          startDay: moment(startDay, 'DD/MM/YYYY'),
        }
      }
    }

    // ADMIN
    return OrderModel.findAll({
      where: {
        ...isUser,
        ...userCondition,
        ...statusCondition,
        ...createdAtCondtion,
        ...startDayCondition
      },
      include: [
        {
          model: User,
          as: 'user',
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
                ...isOwner
              }
            }
          ]
        },
      ],
      order: [
        ...orderStatus,
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
    // SET TIME OUT FOR THAT KEY
    // TODO EX: 30 minutes
    if (newOrder) {
      redis.set(newOrder.id, newOrder.status, 'EX', 30 * 60); // TEST FOR 5 MINTUES
    }

    return this.findOrderById({ id: newOrder.id });
  }

  // todo: ADMIN DONT NEED TO UPDATE ORDER DETAIL
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
      await HistoryService.createHistory({
        orderId: id,
        orderStatus: data.status,
      }, transaction);

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

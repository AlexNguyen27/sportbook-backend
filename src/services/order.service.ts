import OrderModel from '../models/order.model';
import User from '../models/user.model';
import { ExistsError, AuthenticationError, BusinessError } from '../components/errors';
import { Order, MutationCreateOrderArgs, MutationUpdateOrderStatusArgs } from '../types/graphql.type';
import UserService from './user.service';
import SubGroundService from './subGround.service';
import { ROLE, ORDER_STATUS } from '../components/constants';
import SubGround from '../models/subGround.model';
import { sequelize } from '../models/sequelize';
import History from '../models/history.model';

class OrderService {
  static getOrdersByUserId({ userId }: any): Promise<Order[]> {
    // todo get user id in token
    return OrderModel.findAll({
      where: {
        userId,
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
    });
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

  // ADMIN CAN NOT CREATE GROUND FOR OTHER ROLES
  static async createOrder(data: MutationCreateOrderArgs, userId: any): Promise<Order> {
    const { subGroundId }: any = data;
    // CHECK IF USER AND CATEGORY EXITS
    await UserService.findUserById(userId);
    await SubGroundService.findSubGroundById({ id: subGroundId });
    const formatedData: any = { ...data };
    formatedData.histories = {
      orderStatus: ORDER_STATUS.new,
    };
    const newOrder = await OrderModel.create({ ...formatedData, userId, status: ORDER_STATUS.new }, {
      include: [{
        model: History,
        as: 'histories',
      }],
    });

    return this.findOrderById({ id: newOrder.id });
  }

  static async updateOrder(data: any, user: any) {
    const { id, subGroundId } = data;
    const { role, userId } = user;
    const order = await this.findOrderById({ id });

    // only edit order if user created it
    if (role === ROLE.user && order.userId !== userId) {
      throw new AuthenticationError('Your role is not allowed');
    }

    await SubGroundService.findSubGroundById({ id: subGroundId });

    await OrderModel.update({ ...data }, { where: { id } });

    const updatedGround = await this.findOrderById({ id });
    return updatedGround;
  }

  // todo can not delete order
  static async updateStatus(data: MutationUpdateOrderStatusArgs, user: any) {
    const transaction = await sequelize.transaction();

    const { id } = data;
    const order = await this.findOrderById({ id });
    // CAN'T CHANGE STATUS IF ORDER APPROVED
    if (order.status === ORDER_STATUS.approved) {
      throw new BusinessError('Order has been approved!');
    }
    // user only edit status new
    if (order.status !== ORDER_STATUS.new && user.role === ROLE.user) {
      throw new AuthenticationError('Your role is not allowed');
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

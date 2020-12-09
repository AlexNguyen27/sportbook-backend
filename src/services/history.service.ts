import HistoryModel from '../models/history.model';
import { Category } from '../types/graphql.type';
import Order from '../models/order.model';
import User from '../models/user.model';
import OrderService from './order.service';

class HistoryService {
  static async getHistory(filter: any): Promise<Category[]> {
    const { orderId } = filter;
    await OrderService.findOrderById({ id: orderId });
    return HistoryModel.findAll({
      where: {
        orderId,
      },
      include: [
        {
          model: Order,
          as: 'order',
          attributes: ['userId'],
          required: true,
          include: [
            {
              model: User,
              as: 'user',
              required: true,
              attributes: ['id', 'firstName', 'lastName', 'phone', 'email']
            }
          ]
        },
      ],
      order: [
        ['createdAt', 'ASC'],
      ],
    });
  }

  static createHistory(data: any, transaction: any) {
    return HistoryModel.create(data, transaction);
  }
}

export default HistoryService;

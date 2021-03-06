import joi from 'joi';

import { middleware, schemaValidation, tokenValidation } from '../components';
import {
  Order, Resolvers, MutationCreateOrderArgs, MutationUpdateOrderArgs, MutationUpdateOrderStatusArgs,
} from '../types/graphql.type';
import { ROLE, PAYMENT_TYPE } from '../components/constants';
import OrderService from '../services/order.service';

const resolver: Resolvers = {
  Query: {
    orders: middleware(
      tokenValidation(ROLE.owner, ROLE.admin, ROLE.user),
      (_: any, args: any, { user }: any): Promise<Order[]> => OrderService.getOrders(args, user),
    ),
    getOrderById: middleware(
      tokenValidation(ROLE.owner, ROLE.admin, ROLE.user),
      (_: any, args: any, { user }: any): Promise<Order[]> => OrderService.getOrderById(args.id, user),
    ),
  },
  Mutation: {
    // todo validate later
    createOrder: middleware(
      tokenValidation(ROLE.user, ROLE.owner),
      schemaValidation({
        subGroundId: joi.string().uuid(),
        startDay: joi.string(),
        startTime: joi.string(),
        endTime: joi.string(),
        paymentType: joi.string().valid(PAYMENT_TYPE.offline, PAYMENT_TYPE.online),
        price: joi.number(),
        discount: joi.number(),
      }),
      (_: any, args: MutationCreateOrderArgs, { user: { userId } }: any): Promise<Order> => OrderService.createOrder(args, userId),
    ),
    updateOrder: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        id: joi.string().uuid(),
        subGroundId: joi.string().uuid(),
        startDay: joi.string(),
        startTime: joi.string(),
        duration: joi.number(),
        paymentType: joi.string().valid(PAYMENT_TYPE.offline, PAYMENT_TYPE.online),
        price: joi.number(),
        discount: joi.number(),
      }),
      (_: any, args: MutationUpdateOrderArgs, { user }: any): Promise<Order> => OrderService.updateOrder(args, user),
    ),
    updateOrderStatus: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      (_: any, args: MutationUpdateOrderStatusArgs, { user }: any) => OrderService.updateStatus(args, user),
    ),
  },
};

export default resolver;

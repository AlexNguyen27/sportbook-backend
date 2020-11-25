import moment from 'moment';
import GroundModel from '../models/ground.model';
import Category from '../models/category.model';
import Comment from '../models/comment.model';
import Rating from '../models/rating.model';
import User from '../models/user.model';
import { ExistsError, AuthenticationError } from '../components/errors';
import { Ground, MutationCreateGroundArgs } from '../types/graphql.type';
import CategoryService from './category.service';
import UserService from './user.service';
import { ROLE, ORDER_STATUS } from '../components/constants';
import SubGround from '../models/subGround.model';
import Order from '../models/order.model';
import { sequelize } from '../models/sequelize';

const { Op } = require('sequelize');

class GroundService {
  static async getGrounds(filter: any, user: any): Promise<Ground[]> {
    let whereCondition = {};
    if (user.role === ROLE.owner) {
      whereCondition = {
        userId: user.id,
      };
    }

    // FOR STATISTIC
    const { date, startDate, endDate } = filter;
    if (date || (startDate && endDate)) {
      const createdAtCondtions: any = {
        '7days': moment().subtract(7, 'days').startOf('date').toDate(),
        aMonth: moment().subtract(1, 'months').startOf('date').toDate(),
        '6Months': moment().subtract(6, 'months').startOf('date').toDate(),
        aYear: moment().subtract(1, 'years').startOf('date').toDate(),
      }
      let whereDateConditon = {};
      if (date) {
        whereDateConditon = {
          [Op.and]: [
            { status: ORDER_STATUS.approved },
            {
              createdAt: {
                [Op.gte]: createdAtCondtions[date],
              }
            }
          ]
        }
      }

      if (startDate && endDate) {
        whereDateConditon = {
          [Op.and]: [
            { status: ORDER_STATUS.approved },
            {
              createdAt: {
                [Op.gte]: moment(startDate).startOf('day').subtract(1, 'days'),
                [Op.lte]: moment(endDate).startOf('day').add(1, 'days'),
              }
            }
          ]
        }
      }
      const { Sequelize } = sequelize;
      try {
        let groundList: any = await GroundModel.findAll({
          attributes: [
            'id',
            'title',
            [Sequelize.literal('sum("subGrounds->orders"."price" * (100 - "subGrounds->orders"."discount") / 100)'), 'totalAmount'],
            [Sequelize.fn('COUNT', Sequelize.col('"subGrounds->orders"."id"')), 'orderCount']
          ],
          group: ['GROUND.id', 'GROUND.title'],
          include: [
            {
              model: SubGround,
              as: 'subGrounds',
              attributes: [],
              include: [
                {
                  model: Order,
                  as: 'orders',
                  attributes: [],
                  where: {
                    ...whereDateConditon
                  }
                },
              ]
            },
          ],
          where: {
            ...whereCondition,
          },
          order: [
            ['createdAt', 'DESC'],
          ],
        });

        groundList = groundList.map((item: any) => item.toJSON());
        return groundList;
      } catch (error) {
        console.log('error--------------------', error)
      }
    }

    // FOR ADMIN AND OWER
    return GroundModel.findAll({
      include: [
        {
          model: Category,
          as: 'category',
        },
        {
          model: User,
          as: 'user',
        },
        {
          model: SubGround,
          as: 'subGrounds',
        },
      ],
      where: {
        ...whereCondition,
      },
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  static async findGroundById({ id }: { id: any }) {
    let ground: any;
    try {
      ground = await GroundModel.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: 'user',
          },
          {
            model: Category,
            as: 'category',
          },
          {
            model: Comment,
            as: 'comments',
            include: [
              {
                model: User,
                as: 'user',
              },
            ],
            required: false,
          },
          {
            model: Rating,
            as: 'ratings',
            required: false,
          },
          {
            model: SubGround,
            as: 'subGrounds',
            required: false,
          },
        ],
      });
      return { ...ground.toJSON() };
    } catch (error) {
      if (!ground) throw new ExistsError('Ground not found');
      throw error;
    }
  }

  static async findGroundAndUser(filter: any) {
    let ground: any;
    const { groundId, userId } = filter;
    try {
      ground = await GroundModel.findOne({
        where: { id: groundId, userId },
        include: [
          {
            model: SubGround,
            as: 'subGrounds',
            required: false,
          },
        ],
      });
      return { ...ground.toJSON() };
    } catch (error) {
      if (!ground) throw new ExistsError('Ground not found');
      throw error;
    }
  }

  // ADMIN CAN NOT CREATE GROUND FOR OTHER ROLES
  static async createGround(data: MutationCreateGroundArgs, userId: any): Promise<Ground> {
    const {
      categoryId,
      regionCode,
      districtCode,
      wardCode,
      address,
    } = data;
    // CHECK IF USER AND CATEGORY EXITS
    await UserService.findUserById(userId);
    await CategoryService.findCategoryById(categoryId);

    const formatedData = {
      ...data,
      address: JSON.stringify({
        regionCode,
        districtCode,
        wardCode,
        address,
      }),
    };

    const newGround = await GroundModel.create({ ...formatedData, userId });

    return this.findGroundById({ id: newGround.id });
  }

  static async updateGround(data: any, user: any) {
    const {
      id,
      categoryId,
      regionCode,
      districtCode,
      wardCode,
      address,
    } = data;
    const { role, userId } = user;

    const currentGround: any = await this.findGroundById({ id: data.id });
    // ONLY ADMIN CAN DELETE ALL PEOPLE GROUND
    if (role === ROLE.owner && currentGround.userId !== userId) {
      throw new AuthenticationError('Your role is not allowed');
    }
    if (categoryId) {
      await CategoryService.findCategoryById(categoryId);
    }

    const formatedData = {
      ...data,
      address: JSON.stringify({
        regionCode,
        districtCode,
        wardCode,
        address,
      }),
    };

    await GroundModel.update({ ...formatedData }, { where: { id } });
    const updatedGround = await this.findGroundById({ id });
    return updatedGround;
  }

  static async deleteGround(id: string, user: any) {
    const ground = await this.findGroundById({ id });
    if (ground.userId !== user.userId && user.role === ROLE.owner) {
      throw new AuthenticationError('Your role is not allowed');
    }
    await GroundModel.destroy({ where: { id } });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }
}

export default GroundService;

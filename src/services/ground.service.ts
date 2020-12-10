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
import { ROLE, ORDER_STATUS, SUB_GROUND_STATUS } from '../components/constants';
import SubGround from '../models/subGround.model';
import Order from '../models/order.model';
import { sequelize } from '../models/sequelize';
import Price from '../models/price.model';
import DISTRICT from '../components/locales/districts.json';
import REGION from '../components/locales/regions.json';
import WARD from '../components/locales/wards.json';

const { Op } = require('sequelize');

const { Sequelize } = sequelize;

// Tôi muốn tìm sân ở quận 12?
// => trả về cho tui list sân ở quận 12 (có thể sort theo độ phổ biến trước), tui chỉ hiển thị ra 3-5 sân thôi

// Tao muốn thuê sân đại châu vào chiều mai?
// => Trả về true or false.
// Nếu True: trả về cái link của sân đó để người ta đặt
// Nếu False: không làm gì cả

// Cho tao xin sdt của sân hiệp phú?
// => Trả về số điện thoại của sân đó, (ở đây giả sử các sân có tên khác nhau rồi)

// Địa chỉ sân chảo lửa?
// => Trả về địa chỉ của sân.
// Nếu không có sân trả về không có sân tên đó

class GroundService {
  static async searchGrounds(filter: any) {
    const {
      search,
      districtName,
      regionName,
      wardName,
      limit,
      startTime,
      startDay, // DD-MM-YYYYY
    } = filter;

    // ASKING TO ORDER
    if (search && startTime && startDay) {
      const condition: any = {
        where: Sequelize.where(
          Sequelize.fn('similarity',
            Sequelize.col('"GROUND"."title"'),
            `${search}`), { [Op.gte]: '0.1' }
        ),
        include: [
          {
            model: SubGround,
            // attributes: ['id', 'name'], // misss
            required: true,
            as: 'subGrounds',
            include: [
              {
                model: Price,
                // attributes: ['id', 'startTime', 'endTime'],
                as: 'prices',
                where: {
                  startTime: moment(startTime, 'HH:mm:ss').format('HH:mm:ss'),
                }
              },
              {
                model: Order,
                // attributes: ['id', 'startTime', 'endTime'],
                as: 'orders',
                required: false,
                where: {
                  status: [ORDER_STATUS.approved, ORDER_STATUS.paid]
                  // startTime: Sequelize.where(Sequelize.col('ORDER.startTime'), '=', Sequelize.col('PRICE.startTime')),
                }
              }
            ]
          }
        ],
        limit: limit || 5,
      }

      const list: any = await GroundModel.findAll({
        ...condition
      });

      // eslint-disable-next-line array-callback-return
      const formatData = list.reduce((acc: any, curr: any) => {
        let isReady = true;
        curr.subGrounds.forEach((subGround: any) => {
          if (!subGround.orders.length) {
            isReady = true;
          } else {
            subGround.orders.forEach((order: any) => {
              console.log('here------------------order.startDay--------', order.startDay, startDay);
              // compare start time with start day and start time of order
              if (moment(startTime, 'HH:mm:ss').diff(moment(order.startTime, 'HH:mm:ss')) === 0 && moment(order.startDay).isSame(startDay)) {
                isReady = false;
              }
            });
          }
        });
        if (isReady) {
          return [...acc, curr];
        }
        return [...acc];
      }, []);

      return formatData;
    }

    // FIND REGION NAME
    if (regionName) {
      const region: any = Object.values(REGION).find((item: any) => item.name.localeCompare(regionName, 'vn', { sensitivity: 'base' }) === 0
        || item.name_with_type.localeCompare(regionName, 'vn', { sensitivity: 'base' }) === 0);
      if (!region) return [];
      return GroundModel.findAll({
        where: {
          address: {
            [Op.contains]: Sequelize.cast(`{"regionCode": "${region.code}"}`, 'jsonb')
          }
        },
        limit: limit || 5,
      });
    }
    // FIND DISTRICT CODE
    if (districtName) {
      const district: any = Object.values(DISTRICT).find((item: any) => item.name.localeCompare(districtName, 'vn', { sensitivity: 'base' }) === 0
        || item.name_with_type.localeCompare(districtName, 'vn', { sensitivity: 'base' }) === 0);
      if (!district) return [];
      return GroundModel.findAll({
        where: {
          address: {
            [Op.contains]: Sequelize.cast(`{"districtCode": "${district.code}"}`, 'jsonb')
          }
        },
        limit: limit || 5,
      });
    }

    // FIND WARD NAME
    if (wardName) {
      const ward: any = Object.values(WARD).find((item: any) => item.name.localeCompare(wardName, 'vn', { sensitivity: 'base' }) === 0
        || item.name_with_type.localeCompare(wardName, 'vn', { sensitivity: 'base' }) === 0);
      if (!ward) return [];
      return GroundModel.findAll({
        where: {
          address: {
            [Op.contains]: Sequelize.cast(`{"wardCode": "${ward.code}"}`, 'jsonb')
          }
        },
        limit: limit || 5,
      });
    }

    // SEARCH WITH PHONE AND TITLE
    const condition: any = {
      where: Sequelize.where(
        Sequelize.fn('similarity',
          Sequelize.col('"GROUND"."title"'),
          `${search}`), { [Op.gte]: '0.1' }
      ),
      limit: limit || 5,
    }

    const list = await GroundModel.findAll({
      ...condition
    });
    return list;
  }

  static async getGrounds(filter: any, user: any): Promise<Ground[]> {
    let whereCondition = {};

    // FOR OWNER
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
            { status: ORDER_STATUS.approved }, // TODO should be finished
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
            { status: ORDER_STATUS.approved }, // TODO should be finished
            {
              createdAt: {
                [Op.gte]: moment(startDate).startOf('day'),
                [Op.lte]: moment(endDate).startOf('day').add(2, 'days'),
              }
            }
          ]
        }
      }
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

  static async getAllGrounds(filter: any) {
    // add value is avalable
    // count subground has status ready
    const groundList = await GroundModel.findAll({
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
          include: [
            {
              model: Price,
              as: 'prices',
            }
          ]
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    // todo GET AVALABLE GROUND ON TODAY
    const availableGrounds = await GroundModel.findAll({
      attributes: ['id'],
      include: [
        {
          model: SubGround,
          as: 'subGrounds',
          attributes: ['id'],
          required: true,
          include: [
            {
              model: Price,
              as: 'prices',
              required: true,
            },
          ]
        },
      ],
      order: [
        ['createdAt', 'DESC'],
      ],
    });

    // const today = moment().format('DD-MM-YYYY');

    const availableGroundIds = availableGrounds.reduce((acc: any, curr: any) => {
      //  check price with startday today
      // if dont have order => all available

      // curr.subGrounds.map((sub: any) => {
      //   sub.prices.forEach((price: any) => {
      //     // DONT HAVE ORDER => PRICE STATUS ALL READY
      //     sub.orders.forEach((order: any) => {
      //       if (!(today === order.startDay
      //         && order.startTime === price.startTime
      //         && order.endTime === price.endTime
      //         && (order.status === ORDER_STATUS.approved || order.status === ORDER_STATUS.paid))) {
      //         console.log('today----------------', today);
      //         console.log('order.startDay----------------', order.startDay);
      //         return { ...acc, [curr.id]: true };
      //       }
      //     });
      //   })
      // });

      // console.log('idd-----------------', curr.id)
      return { ...acc, [curr.id]: true };
    }, {});

    return groundList.map((ground: any) => {
      const groundItem = ground.toJSON();
      return {
        ...ground.toJSON(),
        isAvailable: !!availableGroundIds[groundItem.id]
      }
    });
  }

  static async checkGroundIdExit({ id }: any) {
    let ground: any;
    try {
      ground = await GroundModel.findOne({
        where: { id },
        include: [
          {
            model: User,
            as: 'user',
          },
        ]
      });
      return { ...ground.toJSON() };
    } catch (error) {
      if (!ground) throw new ExistsError('Ground not found');
      throw error;
    }
  }

  static async findGroundById(filter: any) {
    const { id, startDay } = filter;
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
            include: [
              {
                model: Price,
                as: 'prices',
                required: false
              },
              {
                model: Order,
                as: 'orders',
                required: false,
              }
            ]
          },
        ],
      });

      if (!startDay) {
        return { ...ground.toJSON() }
      }

      const formatGround = JSON.parse(JSON.stringify(ground));
      const { subGrounds } = formatGround;

      // MAP ORDER WITH STATUS APPROVED AND PAID => CAN'T CREATE ORDER
      subGrounds.forEach((sub: any, index: any) => {
        sub.prices.forEach((price: any, priceIndex: any) => {
          // DONT HAVE ORDER => PRICE STATUS ALL READY
          if (!sub.orders.length) {
            formatGround.subGrounds[index].prices[priceIndex] = {
              ...price,
              status: SUB_GROUND_STATUS.ready
            }
          } else {
            sub.orders.forEach((order: any) => {
              if (startDay === order.startDay
                && order.startTime === price.startTime
                && order.endTime === price.endTime
                && (order.status === ORDER_STATUS.approved || order.status === ORDER_STATUS.paid)) {
                formatGround.subGrounds[index].prices[priceIndex] = {
                  ...price,
                  status: SUB_GROUND_STATUS.reserved
                }
              }
            });
            if (!formatGround.subGrounds[index].prices[priceIndex].status) {
              formatGround.subGrounds[index].prices[priceIndex] = {
                ...price,
                status: SUB_GROUND_STATUS.ready
              }
            }
          }
        })
      })

      return formatGround;
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
    } = data;
    // CHECK IF USER AND CATEGORY EXITS
    await UserService.findUserById(userId);
    await CategoryService.findCategoryById(categoryId);

    const newGround = await GroundModel.create({ ...data, userId });

    return this.findGroundById({ id: newGround.id });
  }

  static async updateGround(data: any, user: any) {
    const {
      id,
      categoryId,
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

    await GroundModel.update({ ...data }, { where: { id } });
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

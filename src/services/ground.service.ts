import moment from 'moment';
import GroundModel from '../models/ground.model';
import Category from '../models/category.model';
import Comment from '../models/comment.model';
import Rating from '../models/rating.model';
import User from '../models/user.model';
import { ExistsError, AuthenticationError, BusinessError } from '../components/errors';
import { Ground, MutationCreateGroundArgs } from '../types/graphql.type';
import CategoryService from './category.service';
import UserService from './user.service';
import { ROLE, ORDER_STATUS, SUB_GROUND_STATUS, BENEFIT_STATUS, GROUND_STATUS } from '../components/constants';
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
  // FOR SEARCH ONLY
  static async searchGrounds(filter: any) {
    const {
      search = '',
      districtName,
      regionName,
      wardName,
      limit,
      startTime,
      startDay, // DD-MM-YYYYY
      isAvailable,
    } = filter;
    console.log('filter----------------------', filter);

    // isAvailable  should go with startday
    // SEARCH ALL GROUND
    // IF HAVE ONE READY THEN THE GROUND IS READY TO BOOK
    if (!search && !districtName && !regionName && !wardName && !startDay && !startTime) {
      return GroundModel.findAll({
        where: {
          status: GROUND_STATUS.public,
        },
        include: [
          {
            model: Category,
            as: 'category',
            required: true,
            where: {
              status: BENEFIT_STATUS.enabled,
            },
          },
        ],
        order: [
          ['createdAt', 'ASC'],
        ],
      });
    }

    // TODO FIX LATER
    // ASKING TO ORDER => CHAT BOT
    if (search && startTime && startDay && !isAvailable) {
      const condition: any = {
        where: {
          title: Sequelize.where(
            Sequelize.fn('similarity',
              Sequelize.col('"GROUND"."title"'),
              `${search}`), { [Op.gte]: '0.1' }
          ),
          status: GROUND_STATUS.public, // ONLY GET GROUND STATUS PUBLIC
        },
        include: [
          {
            model: Category,
            as: 'category',
            required: true,
            where: {
              status: BENEFIT_STATUS.enabled, // STATUS ENABLE
            },
          },
          {
            model: SubGround,
            // attributes: ['id', 'name'], // misss
            required: true,
            as: 'subGrounds',
            where: {
              status: GROUND_STATUS.public, // ONLY GET SUB GROUND STATUS PUBLIC
            },
            include: [
              {
                model: Price,
                required: true,
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
                }
              }
            ]
          }
        ],
        limit,
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
                return [...acc]; // REMOVE GROUND ALSO
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
    let addressCondition: any = {};
    if (regionName) {
      const region: any = Object.values(REGION).find((item: any) => item.name.localeCompare(regionName, 'vn', { sensitivity: 'base' }) === 0
        || item.name_with_type.localeCompare(regionName, 'vn', { sensitivity: 'base' }) === 0);

      if (region) {
        addressCondition = {
          address: {
            [Op.contains]: Sequelize.cast(`{"regionCode": "${region.code}"}`, 'jsonb')
          }
        }
      }
    }

    // FIND DISTRICT NAME
    if (districtName) {
      const district: any = Object.values(DISTRICT).find((item: any) => item.name.localeCompare(districtName, 'vn', { sensitivity: 'base' }) === 0
        || item.name_with_type.localeCompare(districtName, 'vn', { sensitivity: 'base' }) === 0);

      if (district) {
        addressCondition = {
          address: {
            ...addressCondition.address,
            [Op.contains]: Sequelize.cast(`{"districtCode": "${district.code}"}`, 'jsonb')
          }
        }
      }
    }

    // FIND WARD NAME
    if (wardName) {
      const ward: any = Object.values(WARD).find((item: any) => item.name.localeCompare(wardName, 'vn', { sensitivity: 'base' }) === 0
        || item.name_with_type.localeCompare(wardName, 'vn', { sensitivity: 'base' }) === 0);

      if (ward) {
        addressCondition = {
          address: {
            ...addressCondition.address,
            [Op.contains]: Sequelize.cast(`{"wardCode": "${ward.code}"}`, 'jsonb')
          }
        }
      }
    }

    // SEARCH WITH PHONE AND TITLE
    // GROUND CONDITION
    let condition: any = {};
    if (search) {
      condition = {
        where: {
          [Op.or]: [
            Sequelize.where(
              Sequelize.fn('similarity',
                Sequelize.col('"GROUND"."title"'),
                `${search}`), { [Op.gte]: '0.1' }
            ),
            Sequelize.where(
              Sequelize.fn('similarity',
                Sequelize.col('"GROUND"."phone"'),
                `${search}`), { [Op.gte]: '0.1' }
            ),
          ],
          status: GROUND_STATUS.public,
        },
      }
    }

    if (regionName || districtName || wardName) {
      condition = {
        where: {
          ...condition.where,
          ...addressCondition // AND
        },
      }
    }

    // FOR CHECK SEARCH ALL AVAILABLE GROUND
    let includeCondition: any = [];
    if (startTime && startDay && isAvailable) {
      includeCondition = [
        {
          model: SubGround,
          required: true,
          as: 'subGrounds',
          where: {
            status: GROUND_STATUS.public,
          },
          include: [
            {
              model: Price,
              required: true, // CAN BOOK
              attributes: ['id', 'startTime', 'endTime'],
              as: 'prices',
              where: {
                startTime: {
                  [Op.gte]: moment(startTime, 'HH:mm:ss').format('HH:mm:ss'), // ONLY GET SUBGROUND HAS PRICE AFTER NOW => CAN BOOK
                },
              }
            },
            {
              model: Order,
              as: 'orders',
              required: false, // DONT HAVE ORDER => IS AVAILABLE
              where: {
                status: [ORDER_STATUS.approved, ORDER_STATUS.paid] // GET THIS FOR MAP EXIT ORDERS
              }
            }
          ]
        }
      ]
    }

    // GET GROUND LIST
    let list = [];
    list = await GroundModel.findAll({
      ...condition,
      include: [
        {
          model: Category,
          as: 'category',
          required: true,
          where: {
            status: BENEFIT_STATUS.enabled,
          },
        },
        ...includeCondition,
      ],
      order: [
        ['createdAt', 'ASC'],
      ],
      limit,
    });

    // MAP AVAILABLE GROUND
    if (startTime && startDay && isAvailable) {
      // console.log('----------------------');
      list = list.reduce((acc: any, curr: any) => {
        let isReady = true;
        curr.subGrounds.forEach((subGround: any) => {
          if (!subGround.orders.length) {
            isReady = true;
          } else {
            subGround.prices.map((price: any) => {
              subGround.orders.forEach((order: any) => {
                console.log('here------------------order.startDay--------', order.startDay, price.endTime, price.startTime);
                // compare start time with start day and start time of order
                if (moment(price.startTime, 'HH:mm:ss').diff(moment(order.startTime, 'HH:mm:ss')) === 0
                  && moment(price.endTime, 'HH:mm:ss').diff(moment(order.endTime, 'HH:mm:ss')) === 0
                  && moment(order.startDay).isSame(startDay)) {
                  isReady = false;
                }
              });
            })
          }
        });
        if (isReady) {
          return [...acc, curr];
        }
        return [...acc];
      }, []);
    }

    return list;
  }

  // FOR ADMIN AND OWNER
  static async getGrounds(filter: any, user: any): Promise<Ground[]> {
    let whereCondition = {};

    // FOR OWNER
    if (user.role === ROLE.owner) {
      whereCondition = {
        userId: user.id,
      };
    }

    // TODO DONT CARE GROUND STATUS PUBLIC OR PRIVATE
    // FOR REPORT SALES
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
            { status: ORDER_STATUS.paid }, // TODO should be finished
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
            { status: ORDER_STATUS.paid }, // TODO should be finished
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
            'address',
            'benefit',
            'phone',
            [Sequelize.literal('sum("subGrounds->orders"."price" * (100 - "subGrounds->orders"."discount") / 100)'), 'totalAmount'],
            [Sequelize.fn('COUNT', Sequelize.col('"subGrounds->orders"."id"')), 'orderCount']
          ],
          group: ['GROUND.id', 'GROUND.title', 'GROUND.address', 'GROUND.phone', 'GROUND.benefit'],
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

    let categoryStatus = {};
    if (user.role === ROLE.owner) {
      categoryStatus = {
        status: BENEFIT_STATUS.enabled
      }
    }

    // FOR ADMIN AND OWER
    return GroundModel.findAll({
      include: [
        {
          model: Category,
          as: 'category',
          where: {
            ...categoryStatus
          }
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

  // FOR USER ONLY
  // TODO REMOVE IS AVAILABE
  static async getAllGrounds(filter: any) {
    // ONLY SHOW GROUND STATUS PUBLIC
    const groundList = await GroundModel.findAll({
      where: {
        status: GROUND_STATUS.public,
      },
      include: [
        {
          model: Category,
          as: 'category',
          where: {
            status: BENEFIT_STATUS.enabled // ONLY SHOW ENABLE CATEGORY
          }
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
    // const availableGrounds = await GroundModel.findAll({
    //   attributes: ['id'],
    //   include: [
    //     {
    //       model: SubGround,
    //       as: 'subGrounds',
    //       attributes: ['id'],
    //       required: true,
    //       include: [
    //         {
    //           model: Price,
    //           as: 'prices',
    //           required: true,
    //         },
    //       ]
    //     },
    //   ],
    //   order: [
    //     ['createdAt', 'DESC'],
    //   ],
    // });

    // const availableGroundIds = availableGrounds.reduce((acc: any, curr: any) => ({ ...acc, [curr.id]: true }), {});
    return groundList;
    // return groundList.map((ground: any) => {
    //   const groundItem = ground.toJSON();
    //   return {
    //     ...ground.toJSON(),
    //     isAvailable: !!availableGroundIds[groundItem.id]
    //   }
    // });
  }

  // ONLY GET WHAT NEEDED
  // AND USER CANT GET GROUND ID PRIVATE => DONT NEED CATEGORY CONDITION
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
          {
            model: Category,
            as: 'category',
          },
        ]
      });
      return { ...ground.toJSON() };
    } catch (error) {
      if (!ground) throw new ExistsError('Ground not found');
      throw error;
    }
  }

  // FOR USER ONLY
  static async findGroundById(filter: any) {
    const { id, startDay, userId } = filter;

    let ground: any;
    try {
      ground = await GroundModel.findOne({
        where: { id, status: GROUND_STATUS.public }, // USER CAN ONLY GET GROUND PUBLIC
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
            where: {
              status: GROUND_STATUS.public,
            },
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

      // FOR OWNER
      if (!startDay && !userId) {
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
              status: SUB_GROUND_STATUS.ready // ON THIS PRICE => DONT HAVE ORDER => READY TO BOOK
            }
          } else {
            sub.orders.forEach((order: any) => {
              if (startDay === order.startDay
                && order.startTime === price.startTime
                && order.endTime === price.endTime
                && (order.status === ORDER_STATUS.approved || order.status === ORDER_STATUS.paid)) {
                formatGround.subGrounds[index].prices[priceIndex] = {
                  ...price,
                  status: SUB_GROUND_STATUS.reserved // MAP ALL SUB GROUND => DONT HAVE STATUS APPOVED OR PAID => RESERVED => CAN'T BOOK
                }
              } else if (startDay === order.startDay
                && order.startTime === price.startTime
                && order.endTime === price.endTime
                && order.userId === userId) { // USER ALREADY BOOK => STATUS CAN BE ALL
                formatGround.subGrounds[index].prices[priceIndex] = {
                  ...price,
                  status: 'booked' // MAP ALL SUB GROUNDs => DONT HAVE STATUS APPOVED OR PAID => RESERVED => CAN'T BOOK
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

    return this.checkGroundIdExit({ id: newGround.id });
  }

  static async updateGround(data: any, user: any) {
    const {
      id,
      categoryId,
    } = data;
    const { role, userId } = user;

    const currentGround: any = await this.checkGroundIdExit({ id: data.id });
    // ONLY ADMIN CAN DELETE ALL PEOPLE GROUND
    if (role === ROLE.owner && currentGround.userId !== userId) {
      throw new AuthenticationError('Your role is not allowed');
    }
    if (categoryId) {
      await CategoryService.findCategoryById(categoryId);
    }

    await GroundModel.update({ ...data }, { where: { id } });
    const updatedGround = await this.checkGroundIdExit({ id });
    return updatedGround;
  }

  static async deleteGround(id: string, user: any) {
    const ground = await this.checkGroundIdExit({ id });

    const hasSubground = await GroundModel.findOne({
      where: { id },
      include: [
        {
          model: SubGround,
          as: 'subGrounds',
          required: true,
        },
      ],
    });

    if (hasSubground) {
      const hasOrder = await GroundModel.findOne({
        where: { id },
        attributes: ['id'],
        include: [
          {
            model: SubGround,
            as: 'subGrounds',
            required: true,
            attributes: ['id'],
            include: [
              {
                model: Order,
                attributes: ['id'],
                required: true,
                as: 'orders',
              },
            ]
          },
        ],
      });

      if (hasOrder) {
        throw new BusinessError('Can not delete ground has orders!');
      }
    }

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

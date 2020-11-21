import GroundModel from '../models/ground.model';
import Category from '../models/category.model';
import Comment from '../models/comment.model';
import Rating from '../models/rating.model';
import User from '../models/user.model';
import { ExistsError, AuthenticationError } from '../components/errors';
import { Ground, MutationCreateGroundArgs } from '../types/graphql.type';
import CategoryService from './category.service';
import UserService from './user.service';
import { ROLE } from '../components/constants';
import SubGround from '../models/subGround.model';

class GroundService {
  static getGrounds(user: any): Promise<Ground[]> {
    let whereCondition = {};
    if (user.role === ROLE.owner) {
      whereCondition = {
        userId: user.id,
      };
    }
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

    console.log(formatedData);

    const newGround = await GroundModel.create({ ...formatedData, userId });

    return this.findGroundById({ id: newGround.id });
  }

  static async updateGround(data: any, user: any) {
    const { id, categoryId } = data;
    const { role, userId } = user;

    const currentGround: any = await this.findGroundById({ id: data.id });

    if (role === ROLE.user && currentGround.userId !== userId) {
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

import Ground from '../models/ground.model';
import SubGroundModel from '../models/subGround.model';
// import Category from '../models/category.model';
// import Comment from '../models/comment.model';
import { ExistsError, AuthenticationError } from '../components/errors';
import {
  SubGround, MutationCreateSubGroundArgs, MutationUpdateSubGroundArgs,
} from '../types/graphql.type';
import GroundService from './ground.service';
import { ROLE } from '../components/constants';

class SubGroundService {
  static async getSubGrounds({ groundId }: any): Promise<SubGround[]> {
    await GroundService.findGroundById({ id: groundId });

    return SubGroundModel.findAll({
      where: {
        groundId,
      },
      include: [
        {
          model: Ground,
          as: 'ground',
        },
      ],
    });
  }

  static async findSubGroundById({ id }: { id: any }) {
    let subGround: any;
    try {
      subGround = await SubGroundModel.findOne({
        where: { id },
        include: [
          {
            model: Ground,
            as: 'ground',
          },
        ],
      });
      return { ...subGround.toJSON() };
    } catch (error) {
      if (!subGround) throw new ExistsError('Sub Ground not found');
      throw error;
    }
  }

  // ADMIN CAN NOT CREATE GROUND FOR OTHER ROLES
  static async createSubGround(data: MutationCreateSubGroundArgs, user: any): Promise<SubGround> {
    const { groundId } = data;
    // cannot create subground of other people ground
    const selectedGround = await GroundService.findGroundById({ id: groundId });
    if (user.id !== selectedGround.userId) {
      throw new AuthenticationError('Could not create sub ground for this ground');
    }
    // CHECK IF GROUND EXITS
    const newGround = await SubGroundModel.create({ ...data });

    return this.findSubGroundById({ id: newGround.id });
  }

  static async updateSubGround(data: MutationUpdateSubGroundArgs, user: any) {
    const {
      id, groundId,
    } = data;

    // allow to update sub Ground to another ground
    const ground: any = await GroundService.findGroundAndUser({ userId: user.id, groundId });
    if (!ground) {
      throw new ExistsError('Can not update sub ground!');
    }
    // if (role === ROLE.user) {
    //   throw new AuthenticationError('Your role is not allowed');
    // }
    // CHECK IF GROUND EXITS
    // const ground: any = await GroundService.findGroundById({ id: groundId });
    // if (groundId !== ground.id) {
    //   throw new ExistsError('Can not update sub ground!');
    // }

    // UDPATE SUB GROUND INFO
    const subGroundId: any = id;
    await SubGroundModel.update({ ...data }, { where: { id: subGroundId } });

    const updatedGround = await this.findSubGroundById({ id });
    return updatedGround;
  }

  static async deleteSubGround(id: any, user: any) {
    await this.findSubGroundById({ id });
    if (ROLE.user === user.role) {
      throw new AuthenticationError('Your role is not allowed');
    }
    await SubGroundModel.destroy({ where: { id } });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }
}

export default SubGroundService;

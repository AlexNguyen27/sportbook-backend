import PriceModel from '../models/price.model';
import { ExistsError } from '../components/errors';
import {
  Price, MutationCreatePriceArgs, MutationUpdatePriceArgs,
} from '../types/graphql.type';
// import { SUB_GROUND_STATUS } from '../components/constants';
import SubGroundService from './subGround.service';
import SubGround from '../models/subGround.model';

class PriceService {
  static async getPrices(filter: any): Promise<Price[]> {
    if (filter?.subGroundId) {
      await SubGroundService.findSubGroundById({ id: filter.subGroundId });
    }

    let where = {};
    if (filter) {
      where = {
        ...filter,
      };
    }

    return PriceModel.findAll({
      where: {
        ...where,
      },
      include: [
        {
          model: SubGround,
          as: 'subGround',
        },
      ],
    });
  }

  static async findPriceById({ id }: { id: any }) {
    let price: any;
    try {
      price = await PriceModel.findOne({
        where: { id },
        include: [
          {
            model: SubGround,
            as: 'subGround',
          },
        ],
      });
      return { ...price.toJSON() };
    } catch (error) {
      if (!price) throw new ExistsError('Price not found');
      throw error;
    }
  }

  // ADMIN CAN NOT CREATE GROUND FOR OTHER ROLES
  static async createPrice(data: MutationCreatePriceArgs): Promise<Price> {
    const { subGroundId } = data;
    // check if  sub ground exist
    await SubGroundService.findSubGroundById({ id: subGroundId });
    const formatedData = {
      ...data,
    };
    // REMOVED PRICE STATUS
    const newPrice = await PriceModel.create({ ...formatedData });

    return this.findPriceById({ id: newPrice.id });
  }

  static async updatePrice(data: MutationUpdatePriceArgs) {
    const {
      id, subGroundId,
    } = data;

    await SubGroundService.findSubGroundById({ id: subGroundId });

    const priceId: any = id;
    await PriceModel.update({ ...data }, { where: { id: priceId } });

    const updatePrice = await this.findPriceById({ id });
    return updatePrice;
  }

  static async deletePrice(id: any) {
    await this.findPriceById({ id });
    await PriceModel.destroy({ where: { id } });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }
}

export default PriceService;

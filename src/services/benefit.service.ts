import BenefitModel from '../models/benefit.model';
import { MutationCreateBenefitArgs, MutationUpdateBenefitArgs } from '../types/graphql.type';
import { ExistsError } from '../components/errors';

class BenefitService {
  static getBenefits(): Promise<[]> {
    return BenefitModel.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  static createBenefit(data: MutationCreateBenefitArgs) {
    return BenefitModel.create(data);
  }

  static findBenefitById(id: number | any | undefined) {
    return BenefitModel.findOne({ where: { id } }).then((benefit) => {
      if (!benefit) throw new ExistsError('Benefit not found');
      return benefit;
    });
  }

  static async updateBenefit(data: MutationUpdateBenefitArgs) {
    const { id } = data;
    await this.findBenefitById(id);
    await BenefitModel.update(data, { where: { id } });

    const currentBenefit = await this.findBenefitById(id);
    return currentBenefit;
  }

  static async deleteBenefit({ id }: { id: number }) {
    const currentBenefit = await BenefitModel.findOne({ where: { id } });
    if (!currentBenefit) {
      throw new ExistsError('Benefit not found');
    }
    await BenefitModel.destroy({ where: { id } });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }
}

export default BenefitService;

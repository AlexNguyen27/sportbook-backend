import BenefitService from '../services/benefit.service';
import {
  Benefit, Resolvers, MutationUpdateBenefitArgs, MutationCreateBenefitArgs, MutationDeleteBenefitArgs,
} from '../types/graphql.type';
import { middleware, tokenValidation } from '../components';
import { ROLE } from '../components/constants';

const resolver: Resolvers = {
  Query: {
    benefits: (): Promise<Benefit[]> => BenefitService.getBenefits(),
  },
  Mutation: {
    createBenefit: (_: any, args: MutationCreateBenefitArgs): Promise<any> => BenefitService.createBenefit(args),
    updateBenefit: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: MutationUpdateBenefitArgs) => BenefitService.updateBenefit(args),
    ),

    deleteBenefit: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: MutationDeleteBenefitArgs) => BenefitService.deleteBenefit(args),
    ),
  },
};

export default resolver;

import joi from 'joi';

import { middleware, schemaValidation, tokenValidation } from '../components';
import {
  Price, Resolvers, MutationCreatePriceArgs, MutationUpdatePriceArgs, MutationDeletePriceArgs,
} from '../types/graphql.type';
import { ROLE } from '../components/constants';
import PriceService from '../services/price.service';

const resolver: Resolvers = {
  Query: {
    prices: (_: any, args: any): Promise<Price[]> => PriceService.getPrices(args),
  },
  Mutation: {
    createPrice: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      (_: any, args: MutationCreatePriceArgs): Promise<Price> => PriceService.createPrice(args),
    ),
    updatePrice: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      (_: any, args: MutationUpdatePriceArgs): Promise<Price> => PriceService.updatePrice(args),
    ),
    deletePrice: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        id: joi.string().uuid(),
      }),
      (_: any, args: MutationDeletePriceArgs) => PriceService.deletePrice(args.id),
    ),
  },
};

export default resolver;

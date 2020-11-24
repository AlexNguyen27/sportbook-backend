import joi from 'joi';

import { middleware, schemaValidation, tokenValidation } from '../components';
import {
  Ground, Resolvers, MutationUpdateGroundArgs, MutationDeleteGroundArgs, MutationCreateGroundArgs,
} from '../types/graphql.type';
import { ROLE } from '../components/constants';
import GroundService from '../services/ground.service';

const resolver: Resolvers = {
  Query: {
    grounds: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      (_: any, args: MutationUpdateGroundArgs, { user }: any) => GroundService.getGrounds(args, user),
    ),
  },
  Mutation: {
    createGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        title: joi.string(),
        description: joi.string(),
        phone: joi.string(),
        address: joi.string(),
        benefit: joi.string(),
        image: joi.string(),
        categoryId: joi.string(),
        regionCode: joi.string(),
        districtCode: joi.string(),
        wardCode: joi.string(),
      }),
      (_: any, args: MutationCreateGroundArgs, { user: { userId } }: any): Promise<Ground> => GroundService.createGround(args, userId),
    ),
    updateGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        id: joi.string().uuid(),
        title: joi.string(),
        description: joi.string(),
        phone: joi.string(),
        address: joi.string(),
        benefit: joi.string(),
        image: joi.string(),
        categoryId: joi.string(),
      }),
      (_: any, args: MutationUpdateGroundArgs, { user }: any): Promise<Ground> => GroundService.updateGround(args, user),
    ),
    deleteGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        id: joi.string().uuid(),
      }),
      (_: any, args: MutationDeleteGroundArgs, { user }: any) => GroundService.deleteGround(args.id, user),
    ),
  },
};

export default resolver;

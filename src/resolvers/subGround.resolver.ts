import joi from 'joi';

import { middleware, schemaValidation, tokenValidation } from '../components';
import {
  SubGround, Resolvers, MutationCreateSubGroundArgs, MutationUpdateSubGroundArgs, MutationDeleteSubGroundArgs,
} from '../types/graphql.type';
import { ROLE, SUB_GROUND_STATUS } from '../components/constants';
import SubGroundService from '../services/subGround.service';

const resolver: Resolvers = {
  Query: {
    subGrounds: (_: any, args: any): Promise<SubGround[]> => SubGroundService.getSubGrounds(args),
  },
  Mutation: {
    createSubGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        type: joi.number(),
        name: joi.string(),
        price: joi.number(),
        discount: joi.number(),
        status: joi.string().valid(Object.values(SUB_GROUND_STATUS)),
        groundId: joi.string().uuid(),
      }),
      (_: any, args: MutationCreateSubGroundArgs, { user }: any): Promise<SubGround> => SubGroundService.createSubGround(args, user),
    ),
    updateSubGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        id: joi.string().uuid(),
        type: joi.number(),
        name: joi.string(),
        price: joi.number(),
        discount: joi.number(),
        status: joi.string().valid(Object.values(SUB_GROUND_STATUS)),
        groundId: joi.string().uuid(),
      }),
      (_: any, args: MutationUpdateSubGroundArgs, { user }: any): Promise<SubGround> => SubGroundService.updateSubGround(args, user),
    ),
    deleteSubGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      schemaValidation({
        id: joi.string().uuid(),
      }),
      (_: any, args: MutationDeleteSubGroundArgs, { user }: any) => SubGroundService.deleteSubGround(args.id, user),
    ),
  },
};

export default resolver;

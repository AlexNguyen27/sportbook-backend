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
      tokenValidation(ROLE.owner, ROLE.admin, ROLE.user),
      (_: any, args: MutationUpdateGroundArgs, { user }: any) => GroundService.getGrounds(args, user),
    ),
    getGroundById: middleware(
      (_: any, args: any) => GroundService.findGroundById({ id: args.id, startDay: args.startDay, userId: args.userId }),
    ),
    getAllGrounds: middleware(
      (_: any, args: any) => GroundService.getAllGrounds(args),
    ),
    searchGrounds: middleware(
      (_: any, args: any) => GroundService.searchGrounds(args),
    ),
  },
  Mutation: {
    createGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
      (_: any, args: MutationCreateGroundArgs, { user: { userId } }: any): Promise<Ground> => GroundService.createGround(args, userId),
    ),
    updateGround: middleware(
      tokenValidation(ROLE.owner, ROLE.admin),
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

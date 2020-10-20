import joi from 'joi';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE } from '../components/constants';
import RatingService from '../services/rating.service';
import { MutationCreateRatingArgs, MutationUpdateRatingArgs } from '../types/graphql.type';

const resolver = {
  Mutation: {
    createRating: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        userId: joi.string().uuid(),
        postId: joi.string().uuid(),
        point: joi.number(),
      }),
      (_: any, args: MutationCreateRatingArgs) => RatingService.createRating(args),
    ),
    updateRating: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        userId: joi.string().uuid(),
        postId: joi.string().uuid(),
        point: joi.number(),
      }),
      (_: any, args: MutationUpdateRatingArgs) => RatingService.updateRating(args),
    ),
  },
};

export default resolver;

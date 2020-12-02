import joi from 'joi';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE } from '../components/constants';
import RatingService from '../services/rating.service';
import { MutationCreateOrUpdateRatingArgs, MutationUpdateRatingArgs } from '../types/graphql.type';

const resolver = {
  Query: {
    ratings: (_: any, args: any): any => RatingService.getRatings(args),
  },
  Mutation: {
    createOrUpdateRating: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        userId: joi.string().uuid(),
        postId: joi.string().uuid(),
        point: joi.number(),
      }),
      (_: any, args: MutationCreateOrUpdateRatingArgs) => RatingService.createOrUpdateRating(args),
    ),
    updateRating: middleware( // TODO REMOVE THIS LATER
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

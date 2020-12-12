import joi from 'joi';
import { middleware, tokenValidation, schemaValidation } from '../components';
import { ROLE } from '../components/constants';
import CommentService from '../services/comment.service';
import { MutationCreateCommentArgs, MutationUpdateCommentArgs, MutationDeleteCommentArgs } from '../types/graphql.type';

const resolver = {
  Query: {
    getCommentsbyGroundId: middleware(
      schemaValidation({
        groundId: joi.string().uuid(),
      }),
      (_: any, args: { groundId: string }) => CommentService.getCommentsbyGroundId(args),
    ),
  },
  Mutation: {
    createComment: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        comment: joi.string(),
        userId: joi.string().uuid(),
        groundId: joi.string().uuid(),
        parentId: joi.string().uuid(),
      }),
      (_: any, args: MutationCreateCommentArgs) => CommentService.createComment(args),
    ),

    updateComment: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        id: joi.string().uuid(),
        comment: joi.string(),
      }),
      (_: any, args: MutationUpdateCommentArgs, { user }: any) => CommentService.updateComment(args, user),
    ),

    deleteComment: middleware(
      tokenValidation(ROLE.user),
      schemaValidation({
        id: joi.string().uuid(),
      }),
      (_: any, args: MutationDeleteCommentArgs) => CommentService.deleteComment(args),
    ),
  },
};

export default resolver;

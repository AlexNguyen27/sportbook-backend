import joi from 'joi';

import { middleware, schemaValidation, tokenValidation } from '../components';
import UserService from '../services/user.service';
import {
  User, Resolvers, QueryLoginArgs, MutationCreateUserArgs, MutationUpdateUserArgs, MutationChangePasswordArgs, MutationDeleteUserArgs,
} from '../types/graphql.type';
import { ROLE } from '../components/constants';

const resolver: Resolvers = {
  Query: {
    users: middleware(
      tokenValidation(ROLE.admin, ROLE.owner, ROLE.user),
      (): Promise<User[]> => UserService.getUsers(),
    ),
    login: (_: any, args: QueryLoginArgs): Promise<any> => UserService.login(args),
    getUserById: middleware(
      tokenValidation(ROLE.admin, ROLE.owner, ROLE.user),
      (_: any, args: any, { user }: any): Promise<User> => UserService.getUserInfo(args.id, user),
    ),
  },
  Mutation: {
    createUser: middleware(
      schemaValidation({
        email: joi.string().required(),
        password: joi.string().required(),
        role: joi.string().valid(Object.values(ROLE)),
      }),
      (_: any, args: MutationCreateUserArgs): Promise<User> => UserService.register(args),
    ),

    updateUser: middleware(
      tokenValidation(ROLE.admin, ROLE.owner, ROLE.user),
      (_: any, args: MutationUpdateUserArgs, { user }: any): Promise<User> => UserService.updateUser(args, user),
    ),
    deleteUser: middleware(
      tokenValidation(ROLE.admin),
      schemaValidation({
        id: joi.string().uuid(),
      }),
      (_: any, args: MutationDeleteUserArgs) => UserService.deleteUser(args),
    ),
    changePassword: middleware(
      tokenValidation(ROLE.admin, ROLE.user),
      schemaValidation({
        id: joi.string().uuid(),
        currentPassword: joi.string(),
        newPassword: joi.string(),
        confirmPassword: joi.string(),
      }),
      (_: any, args: MutationChangePasswordArgs, { user }: any) => UserService.changePassword(args, user),
    ),
  },
};

export default resolver;

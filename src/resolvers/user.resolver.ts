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
      (_: any, args: any, { user }: any): Promise<User[]> => UserService.getUsers(args, user),
    ),
    login: (_: any, args: QueryLoginArgs): Promise<any> => UserService.login(args),
    getUserById: middleware(
      tokenValidation(ROLE.admin, ROLE.owner, ROLE.user),
      (_: any, args: any, { user }: any): Promise<User> => UserService.getUserInfo(args.id, user),
    ),
    loyalCustomers: middleware(
      tokenValidation(ROLE.admin, ROLE.owner, ROLE.user),
      (_: any, args: any, { user }: any): Promise<any[]> => UserService.getUsers(args, user),
    ),
  },
  Mutation: {
    createUser: middleware(
      (_: any, args: MutationCreateUserArgs): Promise<User> => UserService.register(args),
    ),

    uploadAvatar: middleware(
      tokenValidation(ROLE.admin, ROLE.owner, ROLE.user),
      (_: any, args: any, { user }: any): Promise<User> => UserService.uploadAvatar(args, user),
    ),

    uploadMomoQRCode: middleware(
      tokenValidation(ROLE.owner),
      (_: any, args: any, { user }: any): Promise<User> => UserService.uploadMomoQRCode(args, user),
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
      (_: any, args: MutationDeleteUserArgs, { user }: any) => UserService.deleteUser(args.id, user),
    ),
    changePassword: middleware(
      tokenValidation(ROLE.admin, ROLE.user, ROLE.owner),
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

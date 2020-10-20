import CategoryService from '../services/category.service';
import { MutationCreateCategoryArgs, Category, Resolvers } from '../types/graphql.type';
import { middleware, tokenValidation } from '../components';
import { ROLE } from '../components/constants';

const resolver: Resolvers = {
  Query: {
    categories: (): Promise<Category[]> => CategoryService.getCategories(),
  },
  Mutation: {
    createCategory: (_: any, args: MutationCreateCategoryArgs): Promise<Category> => CategoryService.createCategory(args),
    updateCategory: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: { id: string; name: string }) => CategoryService.updateCategory(args),
    ),

    deleteCategory: middleware(
      tokenValidation(ROLE.admin),
      (_: any, args: { id: string }) => CategoryService.deleteCategory(args),
    ),
  },
};

export default resolver;

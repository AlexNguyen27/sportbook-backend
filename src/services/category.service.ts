import { sequelize } from '../models/sequelize';
import GroundModel from '../models/ground.model';
import CategoryModel from '../models/category.model';
import { MutationCreateCategoryArgs, Category } from '../types/graphql.type';

class CategoryService {
  static getCategories(): Promise<Category[]> {
    return CategoryModel.findAll({
      include: [
        {
          model: GroundModel,
          as: 'grounds',
        },
      ],
    });
  }

  static createCategory({ name }: MutationCreateCategoryArgs): Promise<Category> {
    return sequelize.transaction((transaction) => CategoryModel.create({
      name,
    }, { transaction }));
  }
}

export default CategoryService;

import { sequelize } from '../models/sequelize';
import GroundModel from '../models/ground.model';
import CategoryModel from '../models/category.model';
import { MutationCreateCategoryArgs, Category } from '../types/graphql.type';
import { ExistsError } from '../components/errors';

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

  static findCategoryById(id: string | any | undefined) {
    return CategoryModel.findOne({ where: { id } }).then((cate) => {
      if (!cate) throw new ExistsError('Category not found');
      return cate;
    });
  }
}

export default CategoryService;

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
      order: [
        ['createdAt', 'DESC'],
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

  static async updateCategory({ id, name }: { id: string; name: string }) {
    await this.findCategoryById(id);
    await CategoryModel.update({ name }, { where: { id } });

    const currentCategory = await this.findCategoryById(id);
    return currentCategory;
  }

  static async deleteCategory({ id }: { id: string }) {
    const currentCategory = await CategoryModel.findOne({ where: { id } });
    if (!currentCategory) {
      throw new ExistsError('Category not found');
    }
    await CategoryModel.destroy({ where: { id } });
    return {
      status: 200,
      message: 'Delete successfully',
    };
  }
}

export default CategoryService;

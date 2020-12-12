import { sequelize } from '../models/sequelize';
import CategoryModel from '../models/category.model';
import { MutationCreateCategoryArgs, Category } from '../types/graphql.type';
import { ExistsError } from '../components/errors';

class CategoryService {
  static getCategories(): Promise<Category[]> {
    return CategoryModel.findAll({
      order: [
        ['createdAt', 'DESC'],
      ],
    });
  }

  static createCategory({ name, status }: MutationCreateCategoryArgs): Promise<Category> {
    return sequelize.transaction((transaction) => CategoryModel.create({
      name,
      status
    }, { transaction }));
  }

  static findCategoryById(id: string | any | undefined) {
    return CategoryModel.findOne({ where: { id } }).then((cate) => {
      if (!cate) throw new ExistsError('Category not found');
      return cate;
    });
  }

  static async updateCategory(data: any) {
    const { id } = data;
    await this.findCategoryById(id);
    await CategoryModel.update(data, { where: { id } });

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

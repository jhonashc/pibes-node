import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../config";

import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  UpdateCategoryDto,
} from "../dtos";

import { Category } from "../entities";

class CategoryService {
  private readonly categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(createCategoryDto);
  }

  getCategories(
    getCategoriesQueryDto: GetCategoriesQueryDto
  ): Promise<Category[]> {
    const { name, limit = 10, offset = 0 } = getCategoriesQueryDto;

    const findOptionsWhere: FindOptionsWhere<Category> = {};

    if (name) {
      findOptionsWhere.name = Like(`%${name}%`);
    }

    return this.categoryRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getCategoryById(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: {
        id,
      },
    });
  }

  getCategoryByName(name: string): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: {
        name: Like(name),
      },
    });
  }

  updateCategoryById(
    category: Category,
    updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    const { name } = updateCategoryDto;

    const newCategory: Category = this.categoryRepository.create({
      id: category.id,
      name,
    });

    return this.categoryRepository.save(newCategory);
  }

  deleteCategoryById(category: Category): Promise<Category> {
    return this.categoryRepository.remove(category);
  }
}

export default new CategoryService();
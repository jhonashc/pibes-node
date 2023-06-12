import { FindOptionsWhere, In, Like, Repository } from "typeorm";

import { AppDataSource } from "../database";

import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  SearchCategoriesQueryDto,
  UpdateCategoryDto,
} from "../dtos";

import { Category } from "../entities";

class CategoryService {
  private readonly categoryRepository: Repository<Category>;

  constructor() {
    this.categoryRepository = AppDataSource.getRepository(Category);
  }

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const { name } = createCategoryDto;

    const newCategory: Category = this.categoryRepository.create({
      name: name.trim().toLowerCase(),
    });

    return this.categoryRepository.save(newCategory);
  }

  getCategories(
    getCategoriesQueryDto: GetCategoriesQueryDto
  ): Promise<Category[]> {
    const { limit = 10, offset = 0 } = getCategoriesQueryDto;

    return this.categoryRepository.find({
      take: limit,
      skip: offset,
    });
  }

  searchCategories(
    searchCategoriesQueryDto: SearchCategoriesQueryDto
  ): Promise<Category[]> {
    const { name, limit = 10, offset = 0 } = searchCategoriesQueryDto;

    const findOptionsWhere: FindOptionsWhere<Category> = {};

    if (name) {
      findOptionsWhere.name = Like(`%${name.trim().toLowerCase()}%`);
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
        name: Like(name.trim().toLowerCase()),
      },
    });
  }

  getCategoriesByIds(categoryIds: string[]): Promise<Category[]> {
    return this.categoryRepository.find({
      where: {
        id: In(categoryIds),
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
      name: name ? name.trim().toLowerCase() : category.name,
    });

    return this.categoryRepository.save(newCategory);
  }

  deleteCategoryById(category: Category): Promise<Category> {
    return this.categoryRepository.remove(category);
  }
}

export default new CategoryService();

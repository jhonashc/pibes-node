import { NextFunction, Request, Response } from "express";

import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  UpdateCategoryDto,
} from "../dtos";

import { Category } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { CategoryService } from "../services";

export class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body as CreateCategoryDto;

      const lowerCaseName: string = name.trim().toLowerCase();

      const categoryFound: Category | null =
        await CategoryService.getCategoryByName(lowerCaseName);

      if (categoryFound) {
        throw new ConflictException(
          `The category with the name ${lowerCaseName} already exists`
        );
      }

      const createCategoryDto: CreateCategoryDto = {
        name: lowerCaseName,
      };

      const createdCategory: Category = await CategoryService.createCategory(
        createCategoryDto
      );

      res.status(201).json({
        status: true,
        data: createdCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, limit, offset } = req.query as GetCategoriesQueryDto;

      const categories: Category[] = await CategoryService.getCategories({
        name,
        limit,
        offset,
      });

      res.json({
        status: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const categoryFound: Category | null =
        await CategoryService.getCategoryById(id);

      if (!categoryFound) {
        throw new NotFoundException(
          `The category with id ${id} has not been found`
        );
      }

      res.json({
        status: true,
        data: categoryFound,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { name } = req.body as UpdateCategoryDto;

      const categoryFound: Category | null =
        await CategoryService.getCategoryById(id);

      if (!categoryFound) {
        throw new NotFoundException(
          `The category with id ${id} has not been found`
        );
      }

      const updateCategoryDto: UpdateCategoryDto = {
        name,
      };

      const updatedCategory: Category =
        await CategoryService.updateCategoryById(
          categoryFound,
          updateCategoryDto
        );

      res.json({
        status: true,
        data: updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteCategoryById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const categoryFound: Category | null =
        await CategoryService.getCategoryById(id);

      if (!categoryFound) {
        throw new NotFoundException(
          `The category with id ${id} has not been found`
        );
      }

      const deletedCategory: Category =
        await CategoryService.deleteCategoryById(categoryFound);

      res.json({
        status: true,
        data: deletedCategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

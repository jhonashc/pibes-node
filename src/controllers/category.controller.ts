import { NextFunction, Request, Response } from "express";

import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  SearchCategoriesQueryDto,
  UpdateCategoryDto,
} from "../dtos";

import { Category } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { CategoryService } from "../services";

export class CategoryController {
  async createCategory(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body as CreateCategoryDto;

      const filteredName: string = name.trim().toLowerCase();

      const categoryFound: Category | null =
        await CategoryService.getCategoryByName(filteredName);

      if (categoryFound) {
        throw new ConflictException(
          `La categoría con el nombre ${filteredName} ya existe`
        );
      }

      const createCategoryDto: CreateCategoryDto = {
        name: filteredName,
      };

      const createdCategory: Category = await CategoryService.createCategory(
        createCategoryDto
      );

      res.status(201).json({
        status: true,
        message: "La categoría ha sido creada con éxito",
        data: createdCategory,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, page, limit } = req.query as SearchCategoriesQueryDto;

      const categories: Category[] = await CategoryService.searchCategories({
        name,
        page,
        limit,
      });

      res.json({
        status: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, limit } = req.query as GetCategoriesQueryDto;

      const categories: Category[] = await CategoryService.getCategories({
        page,
        limit,
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
          `La categoría con id ${id} no ha sido encontrada`
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
          `La categoría con id ${id} no ha sido encontrada`
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
        message: "La categoría ha sido actualizada con éxito",
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
          `La categoría con id ${id} no ha sido encontrada`
        );
      }

      const deletedCategory: Category =
        await CategoryService.deleteCategoryById(categoryFound);

      res.json({
        status: true,
        message: "La categoría ha sido eliminada con éxito",
        data: deletedCategory,
      });
    } catch (error) {
      next(error);
    }
  }
}

import { Router } from "express";

import { CategoryController } from "../controllers";

import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  IdParamDto,
  SearchCategoriesQueryDto,
  UpdateCategoryDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const categoryController = new CategoryController();

router.post(
  "/",
  validateRequest(CreateCategoryDto),
  categoryController.createCategory
);

router.get(
  "/",
  validateRequest(GetCategoriesQueryDto, ValidationType.QUERY),
  categoryController.getCategories
);

router.get(
  "/search",
  validateRequest(SearchCategoriesQueryDto, ValidationType.QUERY),
  categoryController.searchCategories
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  categoryController.getCategoryById
);

router.patch(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(UpdateCategoryDto),
  categoryController.updateCategoryById
);

router.delete(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  categoryController.deleteCategoryById
);

export default router;

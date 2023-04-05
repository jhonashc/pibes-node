import { Router } from "express";

import { CategoryController } from "../controllers";

import {
  CreateCategoryDto,
  GetCategoriesQueryDto,
  UpdateCategoryDto,
  UuidParamDto,
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
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  categoryController.getCategoryById
);

router.patch(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateCategoryDto),
  categoryController.updateCategoryById
);

router.delete(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  categoryController.deleteCategoryById
);

export default router;

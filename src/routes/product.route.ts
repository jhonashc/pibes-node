import { Router } from "express";

import { ProductController } from "../controllers";

import {
  CreateProductDto,
  GetUsersQueryDto,
  UpdateProductDto,
  UuidParamDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const productController = new ProductController();

router.post(
  "/",
  validateRequest(CreateProductDto),
  productController.createProduct
);

router.get(
  "/",
  validateRequest(GetUsersQueryDto, ValidationType.QUERY),
  productController.getProducts
);

router.get(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  productController.getProductById
);

router.patch(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  validateRequest(UpdateProductDto),
  productController.updateProductById
);

router.delete(
  "/:id",
  validateRequest(UuidParamDto, ValidationType.PARAMS),
  productController.deleteProductById
);

export default router;

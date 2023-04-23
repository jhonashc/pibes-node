import { Router } from "express";

import { ProductController } from "../controllers";

import {
  CreateProductDto,
  GetUsersQueryDto,
  IdParamDto,
  UpdateProductDto,
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
  validateRequest(IdParamDto, ValidationType.PARAMS),
  productController.getProductById
);

router.patch(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(UpdateProductDto),
  productController.updateProductById
);

router.delete(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  productController.deleteProductById
);

export default router;

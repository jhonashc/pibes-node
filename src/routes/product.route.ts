import { Router } from "express";

import { ProductController, ProductPromotionController } from "../controllers";

import {
  CreateProductDto,
  CreateProductPromotionDto,
  GetProductsQueryDto,
  IdParamDto,
  SearchProductsQueryDto,
  UpdateProductDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { uploader, validateRequest } from "../middlewares";

const router = Router();

const productController = new ProductController();
const productPromotionController = new ProductPromotionController();

router.post(
  "/",
  uploader.array("files"),
  validateRequest(CreateProductDto),
  productController.createProduct
);

/* Promotions */
router.post(
  "/:id/promotions",
  validateRequest(CreateProductPromotionDto),
  productPromotionController.createProductPromotions
);

router.get(
  "/",
  validateRequest(GetProductsQueryDto, ValidationType.QUERY),
  productController.getProducts
);

router.get(
  "/search",
  validateRequest(SearchProductsQueryDto, ValidationType.QUERY),
  productController.searchProducts
);

router.get(
  "/:id/similar",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(GetProductsQueryDto, ValidationType.QUERY),
  productController.getSimilarProducts
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  productController.getProductById
);

router.patch(
  "/:id",
  uploader.array("files"),
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

import { Router } from "express";

import { FavoriteController } from "../controllers";

import {
  CreateFavoriteProductDto,
  FavoriteProductIdParamDto,
  UserIdParamDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const favoriteController = new FavoriteController();

router.post(
  "/:userId/products",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  validateRequest(CreateFavoriteProductDto),
  favoriteController.createFavoriteProduct
);

router.get(
  "/:userId/products",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  favoriteController.getFavoriteProducts
);

router.get(
  "/:userId/products/:productId",
  validateRequest(FavoriteProductIdParamDto, ValidationType.PARAMS),
  favoriteController.getFavoriteProduct
);

router.delete(
  "/:userId/products/:productId",
  validateRequest(FavoriteProductIdParamDto, ValidationType.PARAMS),
  favoriteController.deleteFavoriteProduct
);

export default router;

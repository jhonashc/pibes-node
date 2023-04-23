import { Router } from "express";

import { FavoriteController } from "../controllers";

import {
  CreateFavoriteComboDto,
  CreateFavoriteProductDto,
  FavoriteComboIdParamDto,
  FavoriteProductIdParamDto,
  UserIdParamDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const favoriteController = new FavoriteController();

/* Combos */
router.post(
  "/combos",
  validateRequest(CreateFavoriteComboDto),
  favoriteController.createFavoriteCombo
);

router.get(
  "/:userId/combos",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  favoriteController.getFavoriteCombos
);

router.delete(
  "/:userId/combos/:comboId",
  validateRequest(FavoriteComboIdParamDto, ValidationType.PARAMS),
  favoriteController.deleteFavoriteCombo
);

/* Products */
router.post(
  "/products",
  validateRequest(CreateFavoriteProductDto),
  favoriteController.createFavoriteProduct
);

router.get(
  "/:userId/products",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  favoriteController.getFavoriteProducts
);

router.delete(
  "/:userId/products/:productId",
  validateRequest(FavoriteProductIdParamDto, ValidationType.PARAMS),
  favoriteController.deleteFavoriteProduct
);

export default router;

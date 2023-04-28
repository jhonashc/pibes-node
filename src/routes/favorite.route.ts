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
  "/:userId/combos",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  validateRequest(CreateFavoriteComboDto),
  favoriteController.createFavoriteCombo
);

router.get(
  "/:userId/combos",
  validateRequest(UserIdParamDto, ValidationType.PARAMS),
  favoriteController.getFavoriteCombos
);

router.get(
  "/:userId/combos/:comboId",
  validateRequest(FavoriteComboIdParamDto, ValidationType.PARAMS),
  favoriteController.getFavoriteCombo
);

router.delete(
  "/:userId/combos/:comboId",
  validateRequest(FavoriteComboIdParamDto, ValidationType.PARAMS),
  favoriteController.deleteFavoriteCombo
);

/* Products */
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

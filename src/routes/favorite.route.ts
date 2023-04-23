import { Router } from "express";

import { FavoriteController } from "../controllers";

import {
  CreateFavoriteComboDto,
  CreateFavoriteProductDto,
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

export default router;

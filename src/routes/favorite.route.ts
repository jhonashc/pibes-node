import { Router } from "express";

import { FavoriteController } from "../controllers";
import { CreateFavoriteComboDto, CreateFavoriteProductDto } from "../dtos";
import { validateRequest } from "../middlewares";

const router = Router();

const favoriteController = new FavoriteController();

/* Combos */
router.post(
  "/combos",
  validateRequest(CreateFavoriteComboDto),
  favoriteController.createFavoriteCombo
);

/* Products */
router.post(
  "/products",
  validateRequest(CreateFavoriteProductDto),
  favoriteController.createFavoriteProduct
);

export default router;

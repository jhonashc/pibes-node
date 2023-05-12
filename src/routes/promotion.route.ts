import { Router } from "express";

import { PromotionController } from "../controllers";

import {
  CreatePromotionDto,
  GetPromotionsQueryDto,
  GetPromotionsWithProductsQueryDto,
} from "../dtos";

import { ValidationType } from "../interfaces";
import { validateRequest } from "../middlewares";

const router = Router();

const promotionController = new PromotionController();

router.post(
  "/",
  validateRequest(CreatePromotionDto),
  promotionController.createPromotion
);

router.get(
  "/",
  validateRequest(GetPromotionsQueryDto, ValidationType.QUERY),
  promotionController.getPromotions
);

router.get(
  "/products",
  validateRequest(GetPromotionsWithProductsQueryDto, ValidationType.QUERY),
  promotionController.getPromotionsWithProducts
);

export default router;

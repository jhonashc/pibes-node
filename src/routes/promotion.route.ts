import { Router } from "express";

import { PromotionController } from "../controllers";

import { CreatePromotionDto, GetPromotionsQueryDto, IdParamDto } from "../dtos";
import { ValidationType } from "../interfaces";
import { uploader, validateRequest } from "../middlewares";

const router = Router();

const promotionController = new PromotionController();

router.post(
  "/",
  uploader.single("file"),
  validateRequest(CreatePromotionDto),
  promotionController.createPromotion
);

router.get(
  "/",
  validateRequest(GetPromotionsQueryDto, ValidationType.QUERY),
  promotionController.getPromotions
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  promotionController.getPromotionById
);

router.delete(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  promotionController.deletePromotionById
);

export default router;

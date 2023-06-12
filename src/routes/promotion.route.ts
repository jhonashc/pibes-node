import { Router } from "express";

import { PromotionController } from "../controllers";

import {
  CreatePromotionDto,
  GetPromotionsQueryDto,
  IdParamDto,
  SearchPromotionsQueryDto,
  UpdatePromotionDto,
} from "../dtos";

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
  "/search",
  validateRequest(SearchPromotionsQueryDto, ValidationType.QUERY),
  promotionController.searchPromotions
);

router.get(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  promotionController.getPromotionById
);

router.patch(
  "/:id",
  uploader.single("file"),
  validateRequest(IdParamDto, ValidationType.PARAMS),
  validateRequest(UpdatePromotionDto),
  promotionController.updatePromotionById
);

router.delete(
  "/:id",
  validateRequest(IdParamDto, ValidationType.PARAMS),
  promotionController.deletePromotionById
);

export default router;

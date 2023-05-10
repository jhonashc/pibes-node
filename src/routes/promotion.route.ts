import { Router } from "express";
import { PromotionController } from "../controllers";

const router = Router();

const promotionController = new PromotionController();

router.get("/", promotionController.getPromotions);

export default router;

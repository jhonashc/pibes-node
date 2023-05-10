import { NextFunction, Request, Response } from "express";

import { GetPromotionsQueryDto } from "../dtos";
import { Promotion } from "../entities";
import { PromotionMapped } from "../interfaces";
import { mapPromotions } from "../helpers";
import { PromotionService } from "../services";

export class PromotionController {
  async getPromotions(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = req.query as GetPromotionsQueryDto;

      const promotions: Promotion[] = await PromotionService.getPromotions({
        limit,
        offset,
      });

      const mappedPromotions: PromotionMapped[] = mapPromotions(promotions);

      res.json({
        status: true,
        data: mappedPromotions,
      });
    } catch (error) {
      next(error);
    }
  }
}

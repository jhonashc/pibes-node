import { NextFunction, Request, Response } from "express";

import { CreatePromotionDto, GetPromotionsQueryDto } from "../dtos";
import { Product, Promotion } from "../entities";
import { ConflictException } from "../exceptions";
import { ProductService, PromotionService } from "../services";

export class PromotionController {
  async createPromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        description,
        imageUrl,
        discountPercentage,
        availableDay,
        productIds,
      } = req.body as CreatePromotionDto;

      const filteredName: string = name.trim().toLowerCase();

      const promotionFound: Promotion | null =
        await PromotionService.getPromotionByName(filteredName);

      if (promotionFound) {
        throw new ConflictException(
          `La promoción con el nombre ${filteredName} ya existe`
        );
      }

      if (productIds) {
        const productsFound: Product[] = await ProductService.getProductsByIds(
          productIds
        );

        if (productsFound.length !== productIds.length) {
          throw new ConflictException("El id de algún producto no es válido");
        }
      }

      const createPromotionDto: CreatePromotionDto = {
        name,
        description,
        imageUrl,
        discountPercentage,
        availableDay,
        productIds,
      };

      const createdPromotion: Promotion =
        await PromotionService.createPromotion(createPromotionDto);

      res.status(201).json({
        status: true,
        message: "La promoción ha sido creada con éxito",
        data: createdPromotion,
      });
    } catch (error) {
      next(error);
    }
  }

  async getPromotions(req: Request, res: Response, next: NextFunction) {
    try {
      const { day, limit, offset } = req.query as GetPromotionsQueryDto;

      const promotions: Promotion[] = await PromotionService.getPromotions({
        day,
        limit,
        offset,
      });

      res.json({
        status: true,
        data: promotions,
      });
    } catch (error) {
      next(error);
    }
  }
}

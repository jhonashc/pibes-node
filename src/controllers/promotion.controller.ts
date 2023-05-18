import { NextFunction, Request, Response } from "express";

import {
  CreatePromotionDto,
  GetPromotionsQueryDto,
  GetPromotionsWithProductsQueryDto,
} from "../dtos";
import { Product, Promotion } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { mapPromotions } from "../helpers";
import { PromotionMapped } from "../interfaces";
import { ProductService, PromotionService } from "../services";

export class PromotionController {
  async createPromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        name,
        description,
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

  async getPromotionsWithProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { day, limit, offset } =
      req.query as GetPromotionsWithProductsQueryDto;

    const promotions: Promotion[] =
      await PromotionService.getPromotionsWithProducts({
        day,
        limit,
        offset,
      });

    const mappedPromotions: PromotionMapped[] = mapPromotions(promotions);

    res.json({
      status: true,
      data: mappedPromotions,
    });
    try {
    } catch (error) {
      next(error);
    }
  }
}

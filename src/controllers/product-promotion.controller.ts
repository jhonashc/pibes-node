import { NextFunction, Request, Response } from "express";

import { CreateProductPromotionDto } from "../dtos";
import { Product, ProductPromotion, Promotion } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";

import {
  ProductPromotionService,
  ProductService,
  PromotionService,
} from "../services";

export class ProductPromotionController {
  async createProductPromotions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { promotionIds } = req.body as CreateProductPromotionDto;

      const productFound: Product | null = await ProductService.getProductById(
        id
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${id} no ha sido encontrado`
        );
      }

      if (productFound.promotions.length > 0) {
        throw new ConflictException(
          `El producto con id ${id} ya tiene promociones agregadas`
        );
      }

      const promotionsFound: Promotion[] =
        await PromotionService.getPromotionsByIds(promotionIds);

      if (promotionsFound.length !== promotionIds.length) {
        throw new ConflictException("El id de alguna promoción no es válida");
      }

      const createProductPromotionDto: CreateProductPromotionDto = {
        productId: id,
        promotionIds,
      };

      const createdProductPromotions: ProductPromotion[] =
        await ProductPromotionService.createProductPromotions(
          createProductPromotionDto
        );

      res.status(201).json({
        status: true,
        message: "Las promociones del producto se han creado con éxito",
        data: createdProductPromotions,
      });
    } catch (error) {
      next(error);
    }
  }
}

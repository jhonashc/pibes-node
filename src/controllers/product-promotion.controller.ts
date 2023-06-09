import { NextFunction, Request, Response } from "express";

import { CreateProductPromotionDto, UpdateProductPromotionDto } from "../dtos";
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
        promotionIds,
      };

      const createdProductPromotions: ProductPromotion[] =
        await ProductPromotionService.createProductPromotions(
          productFound,
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

  async updateProductPromotions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;
      const { promotionIds } = req.body as UpdateProductPromotionDto;

      const productFound: Product | null = await ProductService.getProductById(
        id
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${id} no ha sido encontrado`
        );
      }

      const promotionsFound: Promotion[] =
        await PromotionService.getPromotionsByIds(promotionIds);

      if (promotionsFound.length !== promotionIds.length) {
        throw new ConflictException("El id de alguna promoción no es válida");
      }

      const updateProductPromotionDto: UpdateProductPromotionDto = {
        promotionIds,
      };

      const updatedProductPromotions: Product | ProductPromotion[] =
        await ProductPromotionService.updateProductPromotions(
          productFound,
          updateProductPromotionDto
        );

      res.status(201).json({
        status: true,
        message: "Las promociones del producto se han actualizado con éxito",
        data: updatedProductPromotions,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProductPromotions(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { id } = req.params;

      const productFound: Product | null = await ProductService.getProductById(
        id
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${id} no ha sido encontrado`
        );
      }

      const productPromotions: ProductPromotion[] =
        await ProductPromotionService.getProductPromotions(id);

      const deletedProductPromotions: ProductPromotion[] =
        await ProductPromotionService.deleteProductPromotions(
          productPromotions
        );

      res.status(201).json({
        status: true,
        message: "Las promociones del producto se han eliminado con éxito",
        data: deletedProductPromotions,
      });
    } catch (error) {
      next(error);
    }
  }
}

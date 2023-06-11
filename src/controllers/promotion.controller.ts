import { NextFunction, Request, Response } from "express";

import {
  CreatePromotionDto,
  GetPromotionsQueryDto,
  UpdatePromotionDto,
} from "../dtos";

import { Product, Promotion } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { FileService, ProductService, PromotionService } from "../services";

export class PromotionController {
  async createPromotion(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file as Express.Multer.File;

      const {
        name,
        description,
        discountPercentage,
        availableDays,
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
        imageUrl: file?.filename,
        discountPercentage,
        availableDays,
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

  async getPromotionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const promotionFound: Promotion | null =
        await PromotionService.getPromotionById(id);

      if (!promotionFound) {
        throw new NotFoundException(
          `La promoción con id ${id} no ha sido encontrada`
        );
      }

      res.json({
        status: true,
        data: promotionFound,
      });
    } catch (error) {
      next(error);
    }
  }

  async updatePromotionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const file = req.file as Express.Multer.File;

      const { name, description, discountPercentage, availableDays } =
        req.body as UpdatePromotionDto;

      const promotionFound: Promotion | null =
        await PromotionService.getPromotionById(id);

      if (!promotionFound) {
        throw new NotFoundException(
          `La promoción con id ${id} no ha sido encontrada`
        );
      }

      const currentPromotionImage: string = promotionFound.imageUrl || "";

      if (file && currentPromotionImage.length > 0) {
        await FileService.deleteImageByName(currentPromotionImage);
      }

      const updatePromotionDto: UpdatePromotionDto = {
        name,
        description,
        imageUrl: file?.filename,
        discountPercentage,
        availableDays,
      };

      const updatedPromotion: Promotion =
        await PromotionService.updatePromotionById(
          promotionFound,
          updatePromotionDto
        );

      res.json({
        status: true,
        data: updatedPromotion,
      });
    } catch (error) {
      next(error);
    }
  }

  async deletePromotionById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const promotionFound: Promotion | null =
        await PromotionService.getPromotionById(id);

      if (!promotionFound) {
        throw new NotFoundException(
          `La promoción con id ${id} no ha sido encontrada`
        );
      }

      const deletedPromotion: Promotion =
        await PromotionService.deletePromotionById(promotionFound);

      res.json({
        status: true,
        message: "La promoción ha sido eliminada con éxito",
        data: deletedPromotion,
      });
    } catch (error) {
      next(error);
    }
  }
}

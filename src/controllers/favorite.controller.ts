import { NextFunction, Request, Response } from "express";

import { CreateFavoriteComboDto, CreateFavoriteProductDto } from "../dtos";

import {
  Combo,
  FavoriteCombo,
  FavoriteProduct,
  Product,
  User,
} from "../entities";

import { ConflictException, NotFoundException } from "../exceptions";

import {
  ComboService,
  FavoriteService,
  ProductService,
  UserService,
} from "../services";

export class FavoriteController {
  async createFavoriteCombo(req: Request, res: Response, next: NextFunction) {
    try {
      const { comboId, userId } = req.body as CreateFavoriteComboDto;

      const comboFound: Combo | null = await ComboService.getComboById(comboId);

      if (!comboFound) {
        throw new NotFoundException(
          `The combo with id ${comboId} has not been found`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const favoriteComboFound: FavoriteCombo | null =
        await FavoriteService.getFavoriteCombo(comboId, userId);

      if (favoriteComboFound) {
        throw new ConflictException(
          "The combo is already defined as a favorite"
        );
      }

      const createFavoriteComboDto: CreateFavoriteComboDto = {
        comboId,
        userId,
      };

      const createdFavoriteCombo: FavoriteCombo =
        await FavoriteService.createFavoriteCombo(createFavoriteComboDto);

      res.status(201).json({
        status: true,
        data: createdFavoriteCombo,
      });
    } catch (error) {
      next(error);
    }
  }

  async createFavoriteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, userId } = req.body as CreateFavoriteProductDto;

      const productFound: Product | null = await ProductService.getProductById(
        productId
      );

      if (!productFound) {
        throw new NotFoundException(
          `The product with id ${productId} has not been found`
        );
      }

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const favoriteProductFound: FavoriteProduct | null =
        await FavoriteService.getFavoriteProduct(productId, userId);

      if (favoriteProductFound) {
        throw new ConflictException(
          "The product is already defined as a favorite"
        );
      }

      const createFavoriteProductDto: CreateFavoriteProductDto = {
        productId,
        userId,
      };

      const createdFavoriteProduct: FavoriteProduct =
        await FavoriteService.createFavoriteProduct(createFavoriteProductDto);

      res.status(201).json({
        status: true,
        data: createdFavoriteProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

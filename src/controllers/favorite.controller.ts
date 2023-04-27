import { NextFunction, Request, Response } from "express";

import {
  CreateFavoriteComboDto,
  CreateFavoriteProductDto,
  GetFavoriteCombosQueryDto,
  GetFavoriteProductsQueryDto,
} from "../dtos";

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

import { mapCombo, mapCombos, mapProduct, mapProducts } from "../helpers";
import { ComboMapped, ProductMapped } from "../interfaces";

export class FavoriteController {
  async createFavoriteCombo(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { comboId } = req.body as CreateFavoriteComboDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const comboFound: Combo | null = await ComboService.getComboById(comboId);

      if (!comboFound) {
        throw new NotFoundException(
          `The combo with id ${comboId} has not been found`
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
      const { userId } = req.params;
      const { productId } = req.body as CreateFavoriteProductDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const productFound: Product | null = await ProductService.getProductById(
        productId
      );

      if (!productFound) {
        throw new NotFoundException(
          `The product with id ${productId} has not been found`
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

  async getFavoriteCombos(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query as GetFavoriteCombosQueryDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const favoriteCombos: FavoriteCombo[] =
        await FavoriteService.getFavoriteCombos(userId, {
          limit,
          offset,
        });

      const combos: Combo[] = favoriteCombos.map(({ combo }) => combo);

      const mappedFavoriteCombos: ComboMapped[] = mapCombos(combos);

      res.json({
        status: true,
        data: mappedFavoriteCombos,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { limit, offset } = req.query as GetFavoriteProductsQueryDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${userId} has not been found`
        );
      }

      const favoriteProducts: FavoriteProduct[] =
        await FavoriteService.getFavoriteProducts(userId, {
          limit,
          offset,
        });

      const products: Product[] = favoriteProducts.map(
        ({ product }) => product
      );

      const mappedFavoriteProducts: ProductMapped[] = mapProducts(products);

      res.json({
        status: true,
        data: mappedFavoriteProducts,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFavoriteCombo(req: Request, res: Response, next: NextFunction) {
    try {
      const { comboId, userId } = req.params;

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

      if (!favoriteComboFound) {
        throw new NotFoundException(
          `The combo with id ${comboId} has not been found in the favorites`
        );
      }

      const deletedFavoriteCombo: FavoriteCombo =
        await FavoriteService.deleteFavoriteCombo(favoriteComboFound);

      const mappedCombo: ComboMapped = mapCombo(deletedFavoriteCombo.combo);

      res.json({
        status: true,
        data: mappedCombo,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFavoriteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, userId } = req.params;

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

      if (!favoriteProductFound) {
        throw new NotFoundException(
          `The product with id ${productId} has not been found in the favorites`
        );
      }

      const deletedFavoriteProduct: FavoriteProduct =
        await FavoriteService.deleteFavoriteProduct(favoriteProductFound);

      const mappedProduct: ProductMapped = mapProduct(
        deletedFavoriteProduct.product
      );

      res.json({
        status: true,
        data: mappedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

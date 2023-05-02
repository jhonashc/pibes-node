import { NextFunction, Request, Response } from "express";

import { CreateFavoriteProductDto, GetFavoriteProductsQueryDto } from "../dtos";
import { FavoriteProduct, Product, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { FavoriteService, ProductService, UserService } from "../services";
import { mapProduct, mapProducts } from "../helpers";
import { ProductMapped } from "../interfaces";

export class FavoriteController {
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

  async getFavoriteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, userId } = req.params;

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

      if (!favoriteProductFound) {
        throw new NotFoundException(
          `The product with id ${productId} has not been found in the favorites`
        );
      }

      const mappedProduct: ProductMapped = mapProduct(
        favoriteProductFound.product
      );

      res.json({
        status: true,
        data: mappedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteFavoriteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productId, userId } = req.params;

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

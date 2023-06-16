import { NextFunction, Request, Response } from "express";

import { CreateFavoriteProductDto, GetFavoriteProductsQueryDto } from "../dtos";
import { FavoriteProduct, Product, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { mapProduct, mapProducts } from "../helpers";
import { ProductMapped } from "../interfaces";
import { FavoriteService, ProductService, UserService } from "../services";

export class FavoriteController {
  async createFavoriteProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { productId } = req.body as CreateFavoriteProductDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const productFound: Product | null = await ProductService.getProductById(
        productId
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${productId} no ha sido encontrado`
        );
      }

      const favoriteProductFound: FavoriteProduct | null =
        await FavoriteService.getFavoriteProduct(productId, userId);

      if (favoriteProductFound) {
        throw new ConflictException(
          "El producto ya está definido como favorito"
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
        message: "El producto ha sido agregado en la favoritos con éxito",
        data: createdFavoriteProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async getFavoriteProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.params;
      const { page, limit } = req.query as GetFavoriteProductsQueryDto;

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const favoriteProducts: FavoriteProduct[] =
        await FavoriteService.getFavoriteProducts(userId, {
          page,
          limit,
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
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const productFound: Product | null = await ProductService.getProductById(
        productId
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${productId} no ha sido encontrado`
        );
      }

      const favoriteProductFound: FavoriteProduct | null =
        await FavoriteService.getFavoriteProduct(productId, userId);

      if (!favoriteProductFound) {
        throw new NotFoundException(
          `El producto con id ${productId} no se ha encontrado en los favoritos`
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
          `El usuario con id ${userId} no ha sido encontrado`
        );
      }

      const productFound: Product | null = await ProductService.getProductById(
        productId
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${productId} no ha sido encontrado`
        );
      }

      const favoriteProductFound: FavoriteProduct | null =
        await FavoriteService.getFavoriteProduct(productId, userId);

      if (!favoriteProductFound) {
        throw new NotFoundException(
          `El producto con id ${productId} no se ha encontrado en los favoritos`
        );
      }

      const deletedFavoriteProduct: FavoriteProduct =
        await FavoriteService.deleteFavoriteProduct(favoriteProductFound);

      const mappedProduct: ProductMapped = mapProduct(
        deletedFavoriteProduct.product
      );

      res.json({
        status: true,
        message: "El producto ha sido eliminado de los favoritos con éxito",
        data: mappedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

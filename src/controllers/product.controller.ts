import { NextFunction, Request, Response } from "express";

import {
  CreateProductDto,
  GetProductsQueryDto,
  SearchProductsQueryDto,
  UpdateProductDto,
} from "../dtos";

import { Category, Product } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { mapProduct, mapProducts } from "../helpers";
import { ProductMapped } from "../interfaces";
import { CategoryService, FileService, ProductService } from "../services";

export class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const files = req.files as Express.Multer.File[];

      const { name, description, price, stock, categoryIds } =
        req.body as CreateProductDto;

      const filteredName: string = name.trim().toLowerCase();

      const productFound: Product | null =
        await ProductService.getProductByName(filteredName);

      if (productFound) {
        throw new ConflictException(
          `El producto con el nombre ${filteredName} ya existe`
        );
      }

      const categoriesFound: Category[] =
        await CategoryService.getCategoriesByIds(categoryIds);

      if (categoriesFound.length !== categoryIds.length) {
        throw new ConflictException("El id de alguna categoría no es válida");
      }

      const createProductDto: CreateProductDto = {
        name: filteredName,
        description,
        images: files?.map(({ filename }) => filename),
        price,
        stock,
        categoryIds,
      };

      const createdProduct: Product = await ProductService.createProduct(
        createProductDto
      );

      res.status(201).json({
        status: true,
        message: "El producto ha sido creado con éxito",
        data: createdProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { limit, offset } = req.query as GetProductsQueryDto;

      const products: Product[] = await ProductService.getProducts({
        limit,
        offset,
      });

      const mappedProducts: ProductMapped[] = mapProducts(products);

      res.json({
        status: true,
        data: mappedProducts,
      });
    } catch (error) {
      next(error);
    }
  }

  async searchProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category, min, max, limit, offset } =
        req.query as SearchProductsQueryDto;

      const products: Product[] = await ProductService.searchProducts({
        name,
        category,
        min,
        max,
        limit,
        offset,
      });

      const mappedProducts: ProductMapped[] = mapProducts(products);

      res.json({
        status: true,
        data: mappedProducts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getSimilarProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { limit, offset } = req.query as GetProductsQueryDto;

      const productFound: Product | null = await ProductService.getProductById(
        id
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${id} no ha sido encontrado`
        );
      }

      const categoryIds: string[] = productFound.categories.map(
        ({ categoryId }) => categoryId
      );

      const similarProducts: Product[] =
        await ProductService.getSimilarProducts(id, categoryIds, {
          limit,
          offset,
        });

      const mappedSimilarProducts: ProductMapped[] =
        mapProducts(similarProducts);

      res.json({
        status: true,
        data: mappedSimilarProducts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req: Request, res: Response, next: NextFunction) {
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

      const mappedProduct: ProductMapped = mapProduct(productFound);

      res.json({
        status: true,
        data: mappedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const files = req.files as Express.Multer.File[];

      const { name, description, price, stock, categoryIds } =
        req.body as UpdateProductDto;

      const productFound: Product | null = await ProductService.getProductById(
        id
      );

      if (!productFound) {
        throw new NotFoundException(
          `El producto con id ${id} no ha sido encontrado`
        );
      }

      if (categoryIds) {
        const categoriesFound: Category[] =
          await CategoryService.getCategoriesByIds(categoryIds);

        if (categoriesFound.length !== categoryIds.length) {
          throw new ConflictException("El id de alguna categoría no es válida");
        }
      }

      const productImages: string[] =
        productFound.images?.map(({ url }) => url) || [];

      if (files.length > 0 && productImages.length > 0) {
        await FileService.deleteImagesByName(productImages);
      }

      const updateProductDto: UpdateProductDto = {
        name,
        description,
        images: files?.map(({ filename }) => filename),
        price,
        stock,
        categoryIds,
      };

      const updatedProduct: Product = await ProductService.updateProductById(
        productFound,
        updateProductDto
      );

      res.status(201).json({
        status: true,
        message: "El producto ha sido actualizado con éxito",
        data: updatedProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById(req: Request, res: Response, next: NextFunction) {
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

      const deletedProduct: Product = await ProductService.deleteProductById(
        productFound
      );

      const mappedProduct: ProductMapped = mapProduct(deletedProduct);

      res.json({
        status: true,
        message: "El producto ha sido eliminado con éxito",
        data: mappedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

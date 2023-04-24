import { NextFunction, Request, Response } from "express";

import {
  CreateProductDto,
  GetProductsQueryDto,
  UpdateProductDto,
} from "../dtos";

import { Category, Product } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { mapProduct, mapProducts } from "../helpers";
import { ProductMapped } from "../interfaces";
import { CategoryService, ProductService } from "../services";

export class ProductController {
  async createProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, description, imageUrl, price, stock, categoryIds } =
        req.body as CreateProductDto;

      const filteredName: string = name.trim().toLowerCase();

      const productFound: Product | null =
        await ProductService.getProductByName(filteredName);

      if (productFound) {
        throw new ConflictException(
          `The product with the name ${name} already exists`
        );
      }

      const categoriesFound: Category[] =
        await CategoryService.getCategoriesByIds(categoryIds);

      if (categoriesFound.length !== categoryIds.length) {
        throw new NotFoundException("The id of some category is invalid");
      }

      const createProductDto: CreateProductDto = {
        name: filteredName,
        description,
        imageUrl,
        price,
        stock,
        categoryIds,
      };

      const createdProduct: Product = await ProductService.createProduct(
        createProductDto
      );

      res.status(201).json({
        status: true,
        data: createdProduct,
      });
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, category, min, max, limit, offset } =
        req.query as GetProductsQueryDto;

      const products: Product[] = await ProductService.getProducts({
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

  async getProductById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const productFound: Product | null = await ProductService.getProductById(
        id
      );

      if (!productFound) {
        throw new NotFoundException(
          `The product with id ${id} has not been found`
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
      const { name, description, imageUrl, price, stock, categoryIds } =
        req.body as UpdateProductDto;

      const productFound: Product | null = await ProductService.getProductById(
        id
      );

      if (!productFound) {
        throw new NotFoundException(
          `The product with id ${id} has not been found`
        );
      }

      if (categoryIds) {
        const categoriesFound: Category[] =
          await CategoryService.getCategoriesByIds(categoryIds);

        if (categoriesFound.length !== categoryIds.length) {
          throw new NotFoundException("The id of some category is invalid");
        }
      }

      const updateProductDto: UpdateProductDto = {
        name,
        description,
        imageUrl,
        price,
        stock,
        categoryIds,
      };

      const updatedProduct: Product | undefined =
        await ProductService.updateProductById(productFound, updateProductDto);

      res.status(201).json({
        status: true,
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
          `The product with id ${id} has not been found`
        );
      }

      const deletedProduct: Product = await ProductService.deleteProductById(
        productFound
      );

      const mappedProduct: ProductMapped = mapProduct(deletedProduct);

      res.json({
        status: true,
        data: mappedProduct,
      });
    } catch (error) {
      next(error);
    }
  }
}

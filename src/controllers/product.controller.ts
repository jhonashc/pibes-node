import { NextFunction, Request, Response } from "express";

import { CreateProductDto, GetProductsQueryDto } from "../dtos";
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

      let newCategoryIds: string[] = [];
      const lowerCaseName: string = name.toLowerCase();

      const productFound: Product | null =
        await ProductService.getProductByName(lowerCaseName);

      if (productFound) {
        throw new ConflictException(
          `The product with the name ${name} already exists`
        );
      }

      if (!categoryIds?.length) {
        const defaultCategory: Category | null =
          await CategoryService.getCategoryByName("all");

        if (!defaultCategory) {
          throw new NotFoundException(
            `The category with the name all has not been found`
          );
        }

        newCategoryIds.push(defaultCategory.id);
      } else {
        const categoriesFound: Category[] =
          await CategoryService.getCategoriesByIds(categoryIds);

        if (categoriesFound.length !== categoryIds.length) {
          throw new NotFoundException("The id of some category is invalid");
        }

        newCategoryIds = categoryIds;
      }

      const createProductDto: CreateProductDto = {
        name,
        description,
        imageUrl,
        price,
        stock,
        categoryIds: newCategoryIds,
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
}

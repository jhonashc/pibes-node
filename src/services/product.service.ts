import {
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from "typeorm";

import { AppDataSource } from "../config";

import {
  CreateProductDto,
  GetProductsQueryDto,
  UpdateProductDto,
} from "../dtos";

import { Product, ProductCategory } from "../entities";

class ProductService {
  private readonly productRepository: Repository<Product>;
  private readonly productCategoryRepository: Repository<ProductCategory>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.productCategoryRepository =
      AppDataSource.getRepository(ProductCategory);
  }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, imageUrl, price, stock, categoryIds } =
      createProductDto;

    const newProduct: Product = this.productRepository.create({
      name: name.trim().toLowerCase(),
      description,
      imageUrl,
      price,
      stock,
      categories: categoryIds.map((categoryId) =>
        this.productCategoryRepository.create({
          category: {
            id: categoryId,
          },
        })
      ),
    });

    return this.productRepository.save(newProduct);
  }

  getProducts(getProductsQueryDto: GetProductsQueryDto): Promise<Product[]> {
    const {
      name,
      category,
      min,
      max,
      limit = 10,
      offset = 0,
    } = getProductsQueryDto;

    const findOptionsWhere: FindOptionsWhere<Product> = {};

    if (name) {
      findOptionsWhere.name = Like(`%${name.trim().toLowerCase()}%`);
    }

    if (category) {
      findOptionsWhere.categories = {
        category: {
          name: Like(category.trim().toLowerCase()),
        },
      };
    }

    if (min) {
      findOptionsWhere.price = LessThanOrEqual(min);
    }

    if (max) {
      findOptionsWhere.price = MoreThanOrEqual(max);
    }

    return this.productRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getProductById(id: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: {
        id,
      },
    });
  }

  getProductByName(name: string): Promise<Product | null> {
    return this.productRepository.findOne({
      where: {
        name: name.trim().toLowerCase(),
      },
    });
  }

  getProductsByIds(productIds: string[]): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        id: In(productIds),
      },
    });
  }

  async updateProductById(
    product: Product,
    updateProductDto: UpdateProductDto
  ): Promise<Product | undefined> {
    const { name, description, imageUrl, price, stock, categoryIds } =
      updateProductDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newProduct: Product = this.productRepository.create({
        id: product.id,
        name: name?.trim().toLowerCase(),
        description,
        imageUrl,
        price,
        stock,
      });

      if (categoryIds) {
        await this.productCategoryRepository.delete({
          product: {
            id: product.id,
          },
        });

        newProduct.categories = categoryIds.map((categoryId) =>
          this.productCategoryRepository.create({
            category: {
              id: categoryId,
            },
          })
        );
      }

      const updatedProduct: Product = await this.productRepository.save(
        newProduct
      );

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return updatedProduct;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  deleteProductById(product: Product): Promise<Product> {
    return this.productRepository.remove(product);
  }
}

export default new ProductService();

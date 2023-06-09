import {
  Between,
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Not,
  Repository,
} from "typeorm";

import { AppDataSource } from "../database";

import {
  CreateProductDto,
  GetProductsQueryDto,
  SearchProductsQueryDto,
  UpdateProductDto,
} from "../dtos";

import { Product, ProductCategory, ProductImage } from "../entities";

class ProductService {
  private readonly productRepository: Repository<Product>;
  private readonly productCategoryRepository: Repository<ProductCategory>;
  private readonly productImageRepository: Repository<ProductImage>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.productCategoryRepository = AppDataSource.getRepository(ProductCategory);
    this.productImageRepository = AppDataSource.getRepository(ProductImage);
  }

  createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const { name, description, price, stock, images, categoryIds } =
      createProductDto;

    const newProduct: Product = this.productRepository.create({
      name: name.trim().toLowerCase(),
      description,
      price,
      stock,
      images: images?.map((url) =>
        this.productImageRepository.create({
          url,
        })
      ),
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

  searchProducts(
    searchProductsQueryDto: SearchProductsQueryDto
  ): Promise<Product[]> {
    const {
      name,
      category,
      min,
      max,
      page = 1,
      limit = 10,
    } = searchProductsQueryDto;

    const offset: number = (page - 1) * limit;

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

    if (min && !max) {
      findOptionsWhere.price = MoreThanOrEqual(min);
    }

    if (max && !min) {
      findOptionsWhere.price = LessThanOrEqual(max);
    }

    if (min && max) {
      findOptionsWhere.price = Between(min, max);
    }

    return this.productRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getProducts(getProductsQueryDto: GetProductsQueryDto): Promise<Product[]> {
    const { page = 1, limit = 10 } = getProductsQueryDto;

    const offset: number = (page - 1) * limit;

    return this.productRepository.find({
      take: limit,
      skip: offset,
    });
  }

  getProductsByIds(productIds: string[]): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        id: In(productIds),
      },
    });
  }

  getSimilarProducts(
    id: string,
    categoryIds: string[],
    getProductsQueryDto: GetProductsQueryDto
  ): Promise<Product[]> {
    const { page = 1, limit = 10 } = getProductsQueryDto;

    const offset: number = (page - 1) * limit;

    return this.productRepository.find({
      where: {
        id: Not(id),
        categories: {
          category: {
            id: In(categoryIds),
          },
        },
      },
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

  async updateProductById(
    product: Product,
    updateProductDto: UpdateProductDto
  ): Promise<Product> {
    const {
      name,
      description,
      price,
      stock,
      images = [],
      categoryIds = [],
    } = updateProductDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newProduct: Product = this.productRepository.create({
        id: product.id,
        name: name ? name?.trim().toLowerCase() : product.name,
        description: description ? description : product.description,
        price: price ? price : product.price,
        stock: stock ? stock : product.stock,
      });

      if (images.length > 0) {
        await this.productImageRepository.delete({
          product: {
            id: product.id,
          },
        });

        newProduct.images = images.map((url) =>
          this.productImageRepository.create({
            url,
          })
        );
      }

      if (categoryIds.length > 0) {
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

    return product;
  }

  deleteProductById(product: Product): Promise<Product> {
    return this.productRepository.remove(product);
  }
}

export default new ProductService();

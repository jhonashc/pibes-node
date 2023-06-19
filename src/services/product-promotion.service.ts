import { Repository } from "typeorm";

import { AppDataSource } from "../database";
import { CreateProductPromotionDto, UpdateProductPromotionDto } from "../dtos";
import { Product, ProductPromotion, Promotion } from "../entities";

class ProductPromotionService {
  private readonly productRepository: Repository<Product>;
  private readonly productpromotionRepository: Repository<ProductPromotion>;
  private readonly promotionRepository: Repository<Promotion>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
    this.productpromotionRepository = AppDataSource.getRepository(ProductPromotion);
    this.promotionRepository = AppDataSource.getRepository(Promotion);
  }

  createProductPromotions(
    product: Product,
    createProductPromotion: CreateProductPromotionDto
  ): Promise<ProductPromotion[]> {
    const { promotionIds } = createProductPromotion;

    const productPromotions: ProductPromotion[] = promotionIds.map(
      (promotionId) =>
        this.productpromotionRepository.create({
          product: this.productRepository.create({
            id: product.id,
          }),
          promotion: this.promotionRepository.create({
            id: promotionId,
          }),
        })
    );

    return this.productpromotionRepository.save(productPromotions);
  }

  getProductPromotions(productId: string): Promise<ProductPromotion[]> {
    return this.productpromotionRepository.find({
      where: {
        product: {
          id: productId,
        },
      },
    });
  }

  async updateProductPromotions(
    product: Product,
    updateProductPromotionDto: UpdateProductPromotionDto
  ): Promise<Product | ProductPromotion[]> {
    const { promotionIds } = updateProductPromotionDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newProductPromotions: ProductPromotion[] = promotionIds.map(
        (promotionId) =>
          this.productpromotionRepository.create({
            product: this.productRepository.create({
              id: product.id,
            }),
            promotion: this.promotionRepository.create({
              id: promotionId,
            }),
          })
      );

      if (promotionIds.length > 0) {
        await this.productpromotionRepository.delete({
          product: {
            id: product.id,
          },
        });
      }

      const updatedProductPromotions: ProductPromotion[] =
        await this.productpromotionRepository.save(newProductPromotions);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return updatedProductPromotions;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }

    return product;
  }

  deleteProductPromotions(
    productPromotions: ProductPromotion[]
  ): Promise<ProductPromotion[]> {
    return this.productpromotionRepository.remove(productPromotions);
  }
}

export default new ProductPromotionService();

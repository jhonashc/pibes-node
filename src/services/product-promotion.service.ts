import { Repository } from "typeorm";

import { AppDataSource } from "../database";
import { CreateProductPromotionDto } from "../dtos";
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
    createProductPromotion: CreateProductPromotionDto
  ): Promise<ProductPromotion[]> {
    const { productId, promotionIds } = createProductPromotion;

    const productPromotions: ProductPromotion[] = promotionIds.map(
      (promotionId) =>
        this.productpromotionRepository.create({
          product: this.productRepository.create({
            id: productId,
          }),
          promotion: this.promotionRepository.create({
            id: promotionId,
          }),
        })
    );

    return this.productpromotionRepository.save(productPromotions);
  }
}

export default new ProductPromotionService();

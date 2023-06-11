import { ArrayOverlap, FindOptionsWhere, Repository } from "typeorm";

import { AppDataSource } from "../database";
import { CreatePromotionDto, GetPromotionsQueryDto } from "../dtos";
import { ProductPromotion, Promotion } from "../entities";
import { getPromotionDay } from "../helpers";

class PromotionService {
  private readonly promotionRepository: Repository<Promotion>;
  private readonly productPromotionRepository: Repository<ProductPromotion>;

  constructor() {
    this.promotionRepository = AppDataSource.getRepository(Promotion);
    this.productPromotionRepository =
      AppDataSource.getRepository(ProductPromotion);
  }

  createPromotion(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const {
      name,
      description,
      imageUrl,
      discountPercentage,
      availableDays,
      productIds,
    } = createPromotionDto;

    const newPromotion: Promotion = this.promotionRepository.create({
      name: name.trim().toLowerCase(),
      description,
      imageUrl,
      discountPercentage,
      availableDays,
      products: productIds?.map((productId) =>
        this.productPromotionRepository.create({
          product: {
            id: productId,
          },
        })
      ),
    });

    return this.promotionRepository.save(newPromotion);
  }

  getPromotions(
    getPromotionsQueryDto: GetPromotionsQueryDto
  ): Promise<Promotion[]> {
    const { day, limit = 10, offset = 0 } = getPromotionsQueryDto;

    const findOptionsWhere: FindOptionsWhere<Promotion> = {};

    if (day) {
      findOptionsWhere.availableDays = ArrayOverlap([day]);
    } else {
      findOptionsWhere.availableDays = ArrayOverlap([getPromotionDay()]);
    }

    return this.promotionRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getPromotionById(id: string): Promise<Promotion | null> {
    return this.promotionRepository.findOne({
      where: {
        id,
      },
    });
  }

  getPromotionByName(name: string): Promise<Promotion | null> {
    return this.promotionRepository.findOne({
      where: {
        name: name.trim().toLowerCase(),
      },
    });
  }

  deletePromotionById(promotion: Promotion): Promise<Promotion> {
    return this.promotionRepository.remove(promotion);
  }
}

export default new PromotionService();

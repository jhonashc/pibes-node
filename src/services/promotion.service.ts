import { ArrayOverlap, FindOptionsWhere, Repository } from "typeorm";

import { AppDataSource } from "../database";

import {
  CreatePromotionDto,
  GetPromotionsQueryDto,
  SearchPromotionsQueryDto,
  UpdatePromotionDto,
} from "../dtos";

import { ProductPromotion, Promotion } from "../entities";
import { getPromotionDay } from "../helpers";

class PromotionService {
  private readonly promotionRepository: Repository<Promotion>;
  private readonly productPromotionRepository: Repository<ProductPromotion>;

  constructor() {
    this.promotionRepository = AppDataSource.getRepository(Promotion);
    this.productPromotionRepository = AppDataSource.getRepository(ProductPromotion);
  }

  createPromotion(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const {
      name,
      description,
      price,
      imageUrl,
      discountPercentage,
      availableDays,
      productIds,
    } = createPromotionDto;

    const newPromotion: Promotion = this.promotionRepository.create({
      name: name.trim().toLowerCase(),
      description,
      price,
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
    const { limit = 10, offset = 0 } = getPromotionsQueryDto;

    return this.promotionRepository.find({
      take: limit,
      skip: offset,
    });
  }

  searchPromotions(
    searchPromotionsQueryDto: SearchPromotionsQueryDto
  ): Promise<Promotion[]> {
    const { day, limit = 10, offset = 0 } = searchPromotionsQueryDto;

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

  updatePromotionById(
    promotion: Promotion,
    updatePromotionDto: UpdatePromotionDto
  ): Promise<Promotion> {
    const {
      name,
      description,
      price,
      imageUrl,
      discountPercentage,
      availableDays = [],
    } = updatePromotionDto;

    const newPromotion: Promotion = this.promotionRepository.create({
      id: promotion.id,
      name: name ? name.trim().toLowerCase() : promotion.name,
      description: description ? description : promotion.description,
      price: price ? price : promotion.price,
      imageUrl: imageUrl ? imageUrl : promotion.imageUrl,
      discountPercentage: discountPercentage
        ? discountPercentage
        : promotion.discountPercentage,
      availableDays:
        availableDays.length > 0 ? availableDays : promotion.availableDays,
    });

    return this.promotionRepository.save(newPromotion);
  }

  deletePromotionById(promotion: Promotion): Promise<Promotion> {
    return this.promotionRepository.remove(promotion);
  }
}

export default new PromotionService();

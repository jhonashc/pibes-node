import { FindOptionsRelations, FindOptionsWhere, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreatePromotionDto, GetPromotionsQueryDto } from "../dtos";
import { Days, ProductPromotion, Promotion } from "../entities";
import { GetPromotionsWithProductsQueryDto } from "../dtos/promotion/query.dto";

class PromotionService {
  private readonly promotionRepository: Repository<Promotion>;
  private readonly productPromotionRepository: Repository<ProductPromotion>;

  constructor() {
    this.promotionRepository = AppDataSource.getRepository(Promotion);
    this.productPromotionRepository =
      AppDataSource.getRepository(ProductPromotion);
  }

  createPromotion(createPromotionDto: CreatePromotionDto): Promise<Promotion> {
    const { name, description, discountPercentage, availableDay, productIds } =
      createPromotionDto;

    const newPromotion: Promotion = this.promotionRepository.create({
      name: name.trim().toLowerCase(),
      description,
      discountPercentage,
      availableDay,
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
      findOptionsWhere.availableDay = day;
    }

    return this.promotionRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getPromotionsWithProducts(
    getPromotionsWithProductsQueryDto: GetPromotionsWithProductsQueryDto
  ): Promise<Promotion[]> {
    const { day, limit = 10, offset = 0 } = getPromotionsWithProductsQueryDto;

    const findOptionsWhere: FindOptionsWhere<Promotion> = {};

    const findOptionsRelations: FindOptionsRelations<Promotion> = {
      products: {
        product: true,
      },
    };

    if (day) {
      findOptionsWhere.availableDay = day;
    }

    return this.promotionRepository.find({
      where: findOptionsWhere,
      relations: findOptionsRelations,
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
}

export default new PromotionService();

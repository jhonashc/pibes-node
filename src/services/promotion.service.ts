import { Repository } from "typeorm";

import { AppDataSource } from "../config";
import { GetPromotionsQueryDto } from "../dtos";
import { Promotion } from "../entities";

class PromotionService {
  private readonly promotionRepository: Repository<Promotion>;

  constructor() {
    this.promotionRepository = AppDataSource.getRepository(Promotion);
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
}

export default new PromotionService();

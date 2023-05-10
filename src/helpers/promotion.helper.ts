import { Promotion } from "../entities";
import { PromotionMapped } from "../interfaces";

import { mapProduct } from "./product.helper";

export const mapPromotion = (promotion: Promotion): PromotionMapped => {
  return {
    ...promotion,
    products: promotion.products.map(({ product }) => mapProduct(product)),
  };
};

export const mapPromotions = (promotions: Promotion[]): PromotionMapped[] => {
  return promotions.map((promotion) => mapPromotion(promotion));
};

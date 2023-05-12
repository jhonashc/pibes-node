import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Date } from "./date.entity";
import { Product } from "./product.entity";
import { Promotion } from "./promotion.entity";

@Entity("product_promotion")
export class ProductPromotion extends Date {
  @PrimaryColumn({
    name: "product_id",
  })
  productId: string;

  @PrimaryColumn({
    name: "promotion_id",
  })
  promotionId: string;

  @ManyToOne(() => Product, (product) => product.promotions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product;

  @ManyToOne(() => Promotion, (promotion) => promotion.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "promotion_id",
  })
  promotion: Promotion;
}

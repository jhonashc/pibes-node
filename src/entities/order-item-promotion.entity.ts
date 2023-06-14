import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Date } from "./date.entity";
import { OrderItem } from "./order-item.entity";
import { Promotion } from "./promotion.entity";

@Entity("order_item_promotion")
export class OrderItemPromotion extends Date {
  @PrimaryColumn({
    name: "promotion_id",
  })
  promotionId: string;

  @PrimaryColumn({
    name: "order_item_id",
  })
  orderItemId: string;

  @ManyToOne(() => Promotion, (promotion) => promotion.orderItems, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "promotion_id",
  })
  promotion: Promotion;

  @ManyToOne(() => OrderItem, (orderItem) => orderItem.promotions, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "order_item_id",
  })
  orderItem: OrderItem;
}

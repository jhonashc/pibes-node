import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Base } from "./base.entity";
import { Product } from "./product.entity";
import { Promotion } from "./promotion.entity";
import { Order } from "./order.entity";

@Entity("order_detail")
export class OrderDetail extends Base {
  @PrimaryColumn({
    name: "product_id",
  })
  productId: string;

  @PrimaryColumn({
    name: "order_id",
  })
  orderId: string;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.details, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "order_id",
  })
  order: Order;

  @ManyToOne(() => Promotion, (promotion) => promotion.orderDetails, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "promotion_id",
  })
  promotion?: Promotion;

  @Column({
    type: "int",
    default: 1,
  })
  quantity: number;
}

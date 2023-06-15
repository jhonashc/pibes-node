import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { Order } from "./order.entity";
import { OrderItemPromotion } from "./order-item-promotion.entity";
import { Product } from "./product.entity";

@Entity("order_item")
export class OrderItem extends Base {
  @ManyToOne(() => Product, (product) => product.orderItems, {
    eager: true,
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product;

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "order_id",
  })
  order: Order;

  @Column({
    type: "int",
    default: 1,
  })
  quantity: number;

  /* Relations */
  @OneToMany(
    () => OrderItemPromotion,
    (orderItemPromotion) => orderItemPromotion.orderItem,
    {
      eager: true,
      cascade: true,
    }
  )
  promotions: OrderItemPromotion[];
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Base } from "./base.entity";
import { Combo } from "./combo.entity";
import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity("order_detail")
export class OrderDetail extends Base {
  @PrimaryColumn({
    name: "order_id",
  })
  orderId: string;

  @ManyToOne(() => Order, (order) => order.details, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "order_id",
  })
  order: Order;

  @ManyToOne(() => Product, (product) => product.orderDetails, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "product_id",
  })
  product?: Product;

  @ManyToOne(() => Combo, (combo) => combo.orderDetails, {
    onDelete: "CASCADE",
    nullable: true,
  })
  @JoinColumn({
    name: "combo_id",
  })
  combo?: Combo;

  @Column("int", {
    default: 1,
  })
  quantity: number;

  @Column("float", {
    default: 0,
  })
  price: number;
}

import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { User } from "./user.entity";
import { OrderDetail } from "./order-detail.entity";

export enum PAYMENT_METHODS {
  CASH = "CASH",
  TRANSFER = "TRANSFER",
}

export enum ORDER_STATUS {
  PENDING = "PENDING",
  IN_PROGRESS = "IN PROGRESS",
  REJECTED = "REJECTED",
}

@Entity("order")
export class Order extends Base {
  @Column({
    type: "enum",
    name: "payment_method",
    enum: PAYMENT_METHODS,
    default: PAYMENT_METHODS.CASH,
  })
  paymentMethod: PAYMENT_METHODS;

  @Column({
    type: "enum",
    name: "order_status",
    enum: ORDER_STATUS,
    default: ORDER_STATUS.PENDING,
  })
  orderStatus: ORDER_STATUS;

  @Column("float", {
    default: 0,
  })
  subtotal: number;

  @Column("float", {
    default: 0,
  })
  total: number;

  /* Relations */
  @ManyToOne(() => User, (user) => user.orders, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.order, {
    eager: true,
    cascade: true,
  })
  details: OrderDetail[];
}

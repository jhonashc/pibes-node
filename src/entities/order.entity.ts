import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { User } from "./user.entity";
import { OrderDetail } from "./order-detail.entity";

export enum PaymentMethods {
  CASH = "CASH",
  TRANSFER = "TRANSFER",
}

export enum OrderStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN PROGRESS",
  REJECTED = "REJECTED",
}

@Entity("order")
export class Order extends Base {
  @Column({
    type: "enum",
    name: "payment_method",
    enum: PaymentMethods,
    default: PaymentMethods.CASH,
  })
  paymentMethod: PaymentMethods;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

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

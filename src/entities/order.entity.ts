import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";

import { Address } from "./address.entity";
import { Base } from "./base.entity";
import { OrderItem } from "./order-item.entity";
import { User } from "./user.entity";

export enum DeliveryStatus {
  ON_TRACK = "ON TRACK",
  DELIVERED = "DELIVERED",
}

export enum DeliveryType {
  TAKE_YOURSELF = "TAKE YOURSELF",
  DELIVERY = "DELIVERY",
}

export enum OrderStatus {
  PENDING = "PENDING",
  IN_PROGRESS = "IN PROGRESS",
  COMPLETED = "COMPLETED",
  REJECTED = "REJECTED",
}

export enum PaymentMethods {
  CASH = "CASH",
  TRANSFER = "TRANSFER",
}

@Entity("order")
export class Order extends Base {
  @Column({
    type: "enum",
    nullable: true,
    enum: DeliveryStatus,
    name: "delivery_status",
  })
  deliveryStatus?: DeliveryStatus;

  @Column({
    type: "enum",
    enum: DeliveryType,
    name: "delivery_type",
  })
  deliveryType: DeliveryType;

  @Column({
    type: "enum",
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  })
  status: OrderStatus;

  @Column({
    type: "enum",
    name: "payment_method",
    enum: PaymentMethods,
    default: PaymentMethods.CASH,
  })
  paymentMethod: PaymentMethods;

  @Column({
    type: "float",
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

  @ManyToOne(() => Address, (address) => address.orders, {
    eager: true,
  })
  @JoinColumn({
    name: "address_id",
  })
  address?: Address;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    eager: true,
    cascade: true,
  })
  items: OrderItem[];
}

import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { ProductPromotion } from "./product-promotion.entity";
import { OrderDetail } from "./order-detail.entity";

export enum DayOfWeek {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY",
}

@Entity("promotion")
export class Promotion extends Base {
  @Column({
    type: "text",
    unique: true,
  })
  name: string;

  @Column({
    type: "text",
    nullable: true,
  })
  description?: string;

  @Column({
    type: "text",
    nullable: true,
    name: "image_url",
  })
  imageUrl?: string;

  @Column({
    type: "int",
    default: 0,
    name: "discount_percentage",
  })
  discountPercentage: number;

  @Column({
    type: "enum",
    array: true,
    enum: DayOfWeek,
    name: "available_days",
  })
  availableDays: DayOfWeek[];

  /* Relations */
  @OneToMany(
    () => ProductPromotion,
    (productPromotion) => productPromotion.promotion,
    {
      cascade: true,
    }
  )
  products: ProductPromotion[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.promotion)
  orderDetails: OrderDetail[];
}

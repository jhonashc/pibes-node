import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { ProductPromotion } from "./product-promotion.entity";

export enum Days {
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
    type: "int",
    default: 0,
    name: "discount_percentage",
  })
  discountPercentage: number;

  @Column({
    type: "enum",
    enum: Days,
    array: true,
    name: "available_days",
  })
  availableDays: Days[];

  /* Relations */
  @OneToMany(
    () => ProductPromotion,
    (productPromotion) => productPromotion.promotion,
    {
      eager: true,
      cascade: true,
    }
  )
  products: ProductPromotion[];
}

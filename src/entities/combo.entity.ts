import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { FavoriteCombo } from "./favorite-combo.entity";
import { OrderDetail } from "./order-detail.entity";
import { ProductCombo } from "./product-combo.entity";
import { ComboCategory } from "./combo-category.entity";

@Entity("combo")
export class Combo extends Base {
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

  @Column("float", {
    default: 0,
  })
  price: number;

  @Column({
    type: "text",
    nullable: true,
    name: "image_url",
  })
  imageUrl?: string;

  /* Relations */
  @OneToMany(() => ComboCategory, (comboCategory) => comboCategory.combo, {
    eager: true,
    cascade: true,
  })
  categories: ComboCategory[];

  @OneToMany(() => ProductCombo, (productCombo) => productCombo.combo, {
    eager: true,
    cascade: true,
  })
  products: ProductCombo[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.combo)
  orderDetails?: OrderDetail[];

  @OneToMany(() => FavoriteCombo, (favoriteCombo) => favoriteCombo.combo)
  users?: FavoriteCombo[];
}

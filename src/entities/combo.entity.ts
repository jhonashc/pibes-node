import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { ComboProduct } from "./combo-product.entity";
import { ComboCategory } from "./combo-category.entity";
import { FavoriteCombo } from "./favorite-combo.entity";
import { OrderDetail } from "./order-detail.entity";

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

  @OneToMany(() => ComboProduct, (comboProduct) => comboProduct.combo, {
    eager: true,
    cascade: true,
  })
  products: ComboProduct[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.combo)
  orderDetails?: OrderDetail[];

  @OneToMany(() => FavoriteCombo, (favoriteCombo) => favoriteCombo.combo)
  users?: FavoriteCombo[];
}

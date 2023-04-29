import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Combo } from "./combo.entity";
import { Date } from "./date.entity";
import { Product } from "./product.entity";

@Entity("combo_product")
export class ComboProduct extends Date {
  @PrimaryColumn({
    name: "combo_id",
  })
  comboId: string;

  @PrimaryColumn({
    name: "product_id",
  })
  productId: string;

  @ManyToOne(() => Combo, (combo) => combo.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "combo_id",
  })
  combo: Combo;

  @ManyToOne(() => Product, (product) => product.combos, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product;

  @Column("int", {
    default: 1,
  })
  quantity: number;
}

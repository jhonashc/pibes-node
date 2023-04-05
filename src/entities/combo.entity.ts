import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { ProductCombo } from "./product-combo.entity";

@Entity("combo")
export class Combo extends Base {
  @Column({
    type: "text",
    unique: true,
  })
  name: string;

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
  @OneToMany(() => ProductCombo, (productCombo) => productCombo.combo, {
    eager: true,
  })
  products: ProductCombo[];
}

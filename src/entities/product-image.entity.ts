import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";

import { Base } from "./base.entity";
import { Product } from "./product.entity";

@Entity("product_image")
export class ProductImage extends Base {
  @Column({
    type: "text",
  })
  url: string;

  @ManyToOne(() => Product, (product) => product.images, {
    nullable: false,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product;
}

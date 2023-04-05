import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { ProductCategory } from "./product-category.entity";

@Entity("product")
export class Product extends Base {
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

  @Column("float", {
    default: 0,
  })
  price: number;

  @Column("int", {
    default: 0,
  })
  stock: number;

  /* Relations */
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category,
    {
      cascade: true,
    }
  )
  categories: ProductCategory[];
}

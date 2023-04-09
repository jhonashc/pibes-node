import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { ProductCategory } from "./product-category.entity";

@Entity("category")
export class Category extends Base {
  @Column({
    type: "text",
    unique: true,
  })
  name: string;

  @Column({
    type: "text",
    unique: true,
    nullable: true,
    name: "emoji_code",
  })
  emojiCode?: string;

  /* Relations */
  @OneToMany(
    () => ProductCategory,
    (productCategory) => productCategory.category
  )
  products?: ProductCategory[];
}

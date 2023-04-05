import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Category } from "./category.entity";
import { Date } from "./date.entity";
import { Product } from "./product.entity";

@Entity("product_category")
export class ProductCategory extends Date {
  @PrimaryColumn({
    name: "category_id",
  })
  categoryId: string;

  @PrimaryColumn({
    name: "product_id",
  })
  productId: string;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "category_id",
  })
  category: Category;

  @ManyToOne(() => Product, (product) => product.categories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product;
}

import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { Date } from "./date.entity";
import { Product } from "./product.entity";
import { User } from "./user.entity";

@Entity("favorite_product")
export class FavoriteProduct extends Date {
  @PrimaryColumn({
    name: "product_id",
  })
  productId: string;

  @PrimaryColumn({
    name: "user_id",
  })
  userId: string;

  @ManyToOne(() => Product, (product) => product.users, {
    eager: true,
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "product_id",
  })
  product: Product;

  @ManyToOne(() => User, (user) => user.favoriteProducts, {
    onDelete: "CASCADE",
  })
  @JoinColumn({
    name: "user_id",
  })
  user: User;
}

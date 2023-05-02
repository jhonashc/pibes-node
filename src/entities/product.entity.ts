import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { FavoriteProduct } from "./favorite-product.entity";
import { OrderDetail } from "./order-detail.entity";
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
    (productCategory) => productCategory.product,
    {
      eager: true,
      cascade: true,
    }
  )
  categories: ProductCategory[];

  @OneToMany(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetails?: OrderDetail[];

  @OneToMany(
    () => FavoriteProduct,
    (favoriteProduct) => favoriteProduct.product
  )
  users?: FavoriteProduct[];
}

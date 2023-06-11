import { Column, Entity, OneToMany } from "typeorm";

import { Base } from "./base.entity";
import { FavoriteProduct } from "./favorite-product.entity";
import { OrderDetail } from "./order-detail.entity";
import { ProductCategory } from "./product-category.entity";
import { ProductImage } from "./product-image.entity";
import { ProductPromotion } from "./product-promotion.entity";

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
    type: "float",
    default: 0,
  })
  price: number;

  @Column({
    type: "int",
    default: 0,
  })
  stock: number;

  /* Relations */
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

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
    () => ProductPromotion,
    (productPromotion) => productPromotion.product
  )
  promotions?: ProductPromotion[];

  @OneToMany(
    () => FavoriteProduct,
    (favoriteProduct) => favoriteProduct.product
  )
  users?: FavoriteProduct[];
}

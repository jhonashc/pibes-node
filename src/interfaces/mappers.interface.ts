import { Category, Product } from "../entities";

export interface OrderMapped {
  details: OrderDetailMapped[];
}

export interface OrderDetailMapped {
  product: ProductMapped;
  quantity: number;
}

export interface ProductMapped {
  images: string[];
  categories: Category[];
}

export interface PromotionMapped {
  products: ProductMapped[];
}

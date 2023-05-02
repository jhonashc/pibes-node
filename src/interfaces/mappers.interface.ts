import { Category, Product } from "../entities";

export interface OrderMapped {
  details: OrderDetailMapped[];
}

export interface OrderDetailMapped {
  product: ProductMapped;
  quantity: number;
}

export interface ProductMapped {
  categories: Category[];
}

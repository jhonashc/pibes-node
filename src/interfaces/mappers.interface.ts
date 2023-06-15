import { Category, Promotion } from "../entities";

export interface OrderMapped {
  items: OrderItemMapped[];
}

export interface OrderItemMapped {
  item: ProductMapped;
  quantity: number;
  promotions?: Promotion[];
}

export interface ProductMapped {
  images?: string[];
  categories: Category[];
  promotions?: Promotion[];
}

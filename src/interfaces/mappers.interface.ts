import { Category } from "../entities";

export interface ComboMapped {
  categories: Category[];
  products: ComboProductMapped[];
}

export interface ComboProductMapped {
  product: ProductMapped;
  quantity: number;
}

export interface OrderMapped {
  details: OrderDetailMapped[];
}

export interface OrderDetailMapped {
  item: ComboMapped | ProductMapped;
  isCombo: boolean;
  quantity: number;
}

export interface ProductMapped {
  categories: Category[];
}

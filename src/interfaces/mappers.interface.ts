import { Category } from "../entities";

export interface ComboMapped {
  name: string;
  imageUrl?: string;
  price: number;
  products: ProductMapped[];
}

export interface ProductMapped {
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stock: number;
  categories: Category[];
}

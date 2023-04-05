import { Category } from "../entities";

export interface ProductMapped {
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stock: number;
  categories: Category[];
}

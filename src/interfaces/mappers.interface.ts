import { Category, Promotion } from "../entities";

export interface OrderMapped {
  user: UserMapped;
  items: OrderItemMapped[];
}

export interface OrderItemMapped {
  item: ProductMapped;
  quantity: number;
}

export interface ProductMapped {
  images: string[];
  categories: Category[];
  promotions: number[]; /* It only includes the discount percentages of the promotion */
}

export interface UserMapped {
  username: string;
  email: string;
  avatarUrl?: string;
}

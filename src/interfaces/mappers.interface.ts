import { Category, OrderStatus, PaymentMethods, User } from "../entities";

export interface ComboMapped {
  name: string;
  imageUrl?: string;
  price: number;
  products: ProductMapped[];
}

export interface OrderMapped<T> {
  id: string;
  paymentMethod: PaymentMethods;
  orderStatus: OrderStatus;
  subtotal: number;
  total: number;
  user: User;
  details: OrderDetailMapped<T>[];
}

export interface OrderDetailMapped<T> {
  item: T;
  isCombo: boolean;
  quantity: number;
  price: number;
}

export interface ProductMapped {
  name: string;
  description?: string;
  imageUrl?: string;
  price: number;
  stock: number;
  categories: Category[];
}

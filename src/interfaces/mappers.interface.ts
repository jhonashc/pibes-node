import { Category, ORDER_STATUS, PAYMENT_METHODS, User } from "../entities";

export interface ComboMapped {
  name: string;
  imageUrl?: string;
  price: number;
  products: ProductMapped[];
}

export interface OrderMapped {
  id: string;
  paymentMethod: PAYMENT_METHODS;
  orderStatus: ORDER_STATUS;
  subtotal: number;
  total: number;
  user: User;
  details: OrderDetailMapped[];
}

export interface OrderDetailMapped {
  combo?: ComboMapped;
  product?: ProductMapped;
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

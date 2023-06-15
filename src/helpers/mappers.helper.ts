import { Order, Product } from "../entities";
import { OrderMapped, ProductMapped } from "../interfaces";

export const mapOrder = (order: Order): OrderMapped => {
  return {
    ...order,
    items: order.items.map(({ product, quantity }) => ({
      item: mapProduct(product),
      quantity,
    })),
  };
};

export const mapOrders = (orders: Order[]): OrderMapped[] => {
  return orders.map((order) => mapOrder(order));
};

export const mapProduct = (product: Product): ProductMapped => {
  return {
    ...product,
    images: product.images?.map(({ url }) => url),
    categories: product.categories.map(({ category }) => category),
    promotions: product.promotions?.map(({ promotion }) => promotion),
  };
};

export const mapProducts = (products: Product[]): ProductMapped[] => {
  return products.map((product) => mapProduct(product));
};

import { Order } from "../entities";
import { OrderMapped } from "../interfaces";

import { mapProduct } from "./product.helper";

export const mapOrder = (order: Order): OrderMapped => {
  return {
    ...order,
    details: order.details.map(({ product, quantity }) => ({
      product: mapProduct(product),
      quantity,
    })),
  };
};

export const mapOrders = (orders: Order[]): OrderMapped[] => {
  return orders.map((order) => mapOrder(order));
};

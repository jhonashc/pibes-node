import { Order } from "../entities";
import { mapCombo, mapProduct } from "../helpers";
import { OrderMapped } from "../interfaces";

export const mapOrder = (order: Order): OrderMapped => {
  return {
    ...order,
    details: order.details.map(({ combo, product, quantity, price }) => ({
      combo: combo && mapCombo(combo),
      product: product && mapProduct(product),
      quantity,
      price,
    })),
  };
};

export const mapOrders = (orders: Order[]): OrderMapped[] => {
  return orders.map((order) => mapOrder(order));
};

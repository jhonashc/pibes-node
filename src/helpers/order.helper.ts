import { Order } from "../entities";
import { mapCombo, mapProduct } from "../helpers";
import { OrderMapped } from "../interfaces";

export const mapOrder = (order: Order): OrderMapped => {
  return {
    ...order,
    details: order.details.map(({ combo, product, quantity }) => ({
      item: combo ? mapCombo(combo) : mapProduct(product!),
      isCombo: combo ? true : false,
      quantity,
    })),
  };
};

export const mapOrders = (orders: Order[]): OrderMapped[] => {
  return orders.map((order) => mapOrder(order));
};

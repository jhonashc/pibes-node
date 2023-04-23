import { Order } from "../entities";
import { OrderMapped } from "../interfaces";

import { mapCombo } from "./combo.helper";
import { mapProduct } from "./product.helper";

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

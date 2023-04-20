import { Order } from "../entities";
import { mapCombo, mapProduct } from "../helpers";
import { ComboMapped, OrderMapped, ProductMapped } from "../interfaces";

export const mapOrder = (
  order: Order
): OrderMapped<ComboMapped | ProductMapped> => {
  return {
    ...order,
    details: order.details.map(({ combo, product, quantity, price }) => {
      return {
        item: combo ? mapCombo(combo) : mapProduct(product!),
        isCombo: combo ? true : false,
        quantity,
        price,
      };
    }),
  };
};

export const mapOrders = (
  orders: Order[]
): OrderMapped<ComboMapped | ProductMapped>[] => {
  return orders.map((order) => mapOrder(order));
};

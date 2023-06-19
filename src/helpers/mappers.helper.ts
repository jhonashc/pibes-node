import { DayOfWeek, Order, Product, Promotion } from "../entities";
import {
  OrderMapped,
  ProductMapped,
  ProductPromotionMapped,
} from "../interfaces";

import { getPromotionDay } from "./promotion.helper";

export const mapOrder = (order: Order): OrderMapped => {
  const { user } = order;

  return {
    ...order,
    user: {
      username: user.username,
      email: user.email,
      avatarUrl: user.avatarUrl,
    },
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
  const currentDay: DayOfWeek = getPromotionDay();

  return {
    ...product,
    images: product.images.map(({ url }) => url),
    categories: product.categories.map(({ category }) => category),
    promotions: product.promotions
      .filter(({ promotion }) => promotion.availableDays.includes(currentDay))
      .map(({ promotion }) => mapProductPromotion(promotion)),
  };
};

export const mapProductPromotion = (
  promotion: Promotion
): ProductPromotionMapped => {
  const { id, name, discountPercentage } = promotion;

  return {
    id,
    name,
    discountPercentage,
  };
};

export const mapProducts = (products: Product[]): ProductMapped[] => {
  return products.map((product) => mapProduct(product));
};

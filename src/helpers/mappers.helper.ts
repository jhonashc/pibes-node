import { Order, Product, Promotion } from "../entities";
import { OrderMapped, ProductMapped, PromotionMapped } from "../interfaces";

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

export const mapProduct = (product: Product): ProductMapped => {
  return {
    ...product,
    images: product.images?.map(({ url }) => url) || [],
    categories: product.categories.map(({ category }) => category),
  };
};

export const mapProducts = (products: Product[]): ProductMapped[] => {
  return products.map((product) => mapProduct(product));
};

export const mapPromotion = (promotion: Promotion): PromotionMapped => {
  return {
    ...promotion,
    products: promotion.products.map(({ product }) => mapProduct(product)),
  };
};

export const mapPromotions = (promotions: Promotion[]): PromotionMapped[] => {
  return promotions.map((promotion) => mapPromotion(promotion));
};

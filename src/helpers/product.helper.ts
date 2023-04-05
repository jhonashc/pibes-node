import { Product } from "../entities";
import { ProductMapped } from "../interfaces";

export const mapProduct = (product: Product): ProductMapped => {
  return {
    ...product,
    categories: product.categories.map(({ category }) => category),
  };
};

export const mapProducts = (products: Product[]): ProductMapped[] => {
  return products.map((product) => {
    return {
      ...product,
      categories: product.categories.map(({ category }) => category),
    };
  });
};

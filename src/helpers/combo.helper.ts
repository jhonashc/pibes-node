import { Combo } from "../entities";
import { ComboMapped } from "../interfaces";

export const mapCombo = (combo: Combo): ComboMapped => {
  return {
    ...combo,
    products: combo.products.map(({ product }) => ({
      ...product,
      categories: product.categories.map(({ category }) => category),
    })),
  };
};

export const mapCombos = (combos: Combo[]): ComboMapped[] => {
  return combos.map((combo) => {
    return {
      ...combo,
      products: combo.products.map(({ product }) => ({
        ...product,
        categories: product.categories.map(({ category }) => category),
      })),
    };
  });
};

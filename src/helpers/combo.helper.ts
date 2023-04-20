import { Combo } from "../entities";
import { ComboMapped } from "../interfaces";

export const mapCombo = (combo: Combo): ComboMapped => {
  return {
    ...combo,
    products: combo.products.map(({ product, quantity }) => ({
      product: {
        ...product,
        categories: product.categories.map(({ category }) => category),
      },
      quantity,
    })),
  };
};

export const mapCombos = (combos: Combo[]): ComboMapped[] => {
  return combos.map((combo) => mapCombo(combo));
};

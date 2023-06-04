import { setSeederFactory } from "typeorm-extension";

import { Category } from "../../entities";

export default setSeederFactory(Category, (faker) => {
  const category = new Category();
  category.name = `${faker.commerce.productAdjective()} ${faker.commerce.productMaterial()} ${faker.commerce.product()}`;

  return category;
});

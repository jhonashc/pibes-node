import { setSeederFactory } from "typeorm-extension";

import { Product } from "../../entities";

export default setSeederFactory(Product, (faker) => {
  const minPrice = 3;
  const maxPrice = 20;
  
  const minStcok = 10;
  const maxStock = 100;

  const product = new Product();
  product.name = faker.commerce.productName().toLowerCase();
  product.description = faker.commerce.productDescription();

  product.price = parseFloat(
    faker.commerce.price({ min: minPrice, max: maxPrice })
  );

  product.stock = Math.floor(Math.random() * (maxStock - minStcok + 1)) + minStcok;

  return product;
});

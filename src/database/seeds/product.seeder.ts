import { DataSource, Repository } from "typeorm";
import { Seeder, SeederFactory, SeederFactoryManager } from "typeorm-extension";

import { Category, Product, ProductCategory } from "../../entities";

export class ProductSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const min = 1;
    const max = 10;

    const productCategoryRepository: Repository<ProductCategory> =
      dataSource.getRepository(ProductCategory);

    const categoryFactory: SeederFactory<Category> =
      factoryManager.get(Category);

    const productFactory: SeederFactory<Product> = factoryManager.get(Product);

    const randomSlice: number = Math.floor(Math.random() * (max - min + 1)) + min;

    // Save 10 factory generated entities, to the database
    const categories: Category[] = await categoryFactory.saveMany(max);

    await productFactory.saveMany(max, {
      categories: categories.slice(0, randomSlice).map((category) =>
        productCategoryRepository.create({
          category,
        })
      ),
    });
  }
}

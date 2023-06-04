import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager, runSeeders } from "typeorm-extension";

import { ProductFactory, UserFactory } from "../factories";
import { ProductSeeder, UserSeeder } from "../seeds";

export class InitSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    await runSeeders(dataSource, {
      seeds: [ProductSeeder, UserSeeder],
      factories: [ProductFactory, UserFactory],
    });
  }
}

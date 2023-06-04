import { DataSource, Repository } from "typeorm";
import { Seeder, SeederFactory, SeederFactoryManager } from "typeorm-extension";

import { Roles, User } from "../../entities";

export class UserSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<any> {
    const repository: Repository<User> = dataSource.getRepository(User);

    const newUser: User = repository.create({
      username: "admin",
      email: "admin@gmail.com",
      password: "password",
      roles: [Roles.USER, Roles.ADMIN],
    });

    const userFound: User | null = await repository.findOneBy({
      username: newUser.username,
    });

    // Insert only one record with this username
    if (!userFound) {
      await repository.insert(newUser);
    }

    const userFactory: SeederFactory<User> = factoryManager.get(User);

    // save 5 factory generated entities, to the database
    await userFactory.saveMany(10);
  }
}

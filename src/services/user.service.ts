import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from "../dtos";
import { Gender, Person, User } from "../entities";

class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(createUserDto: CreateUserDto): Promise<User | undefined> {
    const {
      firstName,
      lastName,
      telephone,
      genderId,
      username,
      email,
      password,
      avatarUrl,
      roles,
    } = createUserDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newPerson: Person = queryRunner.manager.create(Person, {
        firstName,
        lastName,
        telephone,
        gender: queryRunner.manager.create(Gender, {
          id: genderId,
        }),
      });

      await queryRunner.manager.save(newPerson);

      const newUser: User = queryRunner.manager.create(User, {
        person: newPerson,
        username,
        email,
        password,
        avatarUrl,
        roles,
      });

      const createdUser: User = await queryRunner.manager.save(newUser);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return createdUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  getUsers(getUsersQueryDto: GetUsersQueryDto): Promise<User[]> {
    const { username, limit = 10, offset = 0 } = getUsersQueryDto;

    const findOptionsWhere: FindOptionsWhere<User> = {};

    if (username) {
      findOptionsWhere.username = Like(`%${username.toLowerCase()}%`);
    }

    return this.userRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        email: Like(email),
      },
    });
  }

  async updateUserById(
    user: User,
    updateUserDto: UpdateUserDto
  ): Promise<User | undefined> {
    const {
      firstName,
      lastName,
      telephone,
      genderId,
      username,
      email,
      password,
      avatarUrl,
      roles,
    } = updateUserDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUser: User = queryRunner.manager.create(User, {
        id: user.id,
        username,
        email,
        password,
        avatarUrl,
        person: user.person,
        roles,
      });

      const newPerson: Person = queryRunner.manager.create(Person, {
        id: newUser.person.id,
        firstName,
        lastName,
        telephone,
        gender: queryRunner.manager.create(Gender, {
          id: genderId,
        }),
      });

      // Saving the new changes to the person entity
      await queryRunner.manager.save(newPerson);

      newUser.person = newPerson;

      // Saving the new changes to the user entity
      const updatedUser: User = await queryRunner.manager.save(newUser);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return updatedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async deleteUserById(user: User): Promise<User | undefined> {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const person: Person | null = await queryRunner.manager.findOne(Person, {
        where: {
          id: user.person.id,
        },
      });

      await queryRunner.manager.remove(user);
      await queryRunner.manager.remove(person);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return user;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}

export default new UserService();

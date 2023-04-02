import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateUserDto, GetUsersQueryDto } from "../dtos";
import { Gender, Person, User, UserRole } from "../entities";

class UserService {
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async createUser(createUserDto: CreateUserDto) {
    const {
      firstName,
      lastName,
      telephone,
      genderId,
      username,
      email,
      password,
      avatarUrl,
      roleIds,
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
        roles: roleIds.map((roleId: string) =>
          queryRunner.manager.create(UserRole, {
            role: {
              id: roleId,
            },
          })
        ),
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
}

export default new UserService();

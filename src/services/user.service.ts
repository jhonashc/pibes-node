import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from "../dtos";
import { Person, Roles, User } from "../entities";

class UserService {
  private readonly personRepository: Repository<Person>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.personRepository = AppDataSource.getRepository(Person);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const { person, username, email, password, avatarUrl, roles } =
      createUserDto;

    const newUser: User = this.userRepository.create({
      username,
      email,
      password,
      avatarUrl,
      roles: roles?.length ? roles : [Roles.USER],
      person:
        person &&
        this.personRepository.create({
          firstName: person?.firstName,
          lastName: person?.lastName,
          telephone: person?.telephone,
          gender: person?.gender,
        }),
    });

    return this.userRepository.save(newUser);
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

  updateUserById(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const { person, username, avatarUrl, roles } = updateUserDto;

    const newUser: User = this.userRepository.create({
      id: user.id,
      username,
      avatarUrl,
      roles: roles?.length ? roles : user.roles,
      person: person
        ? this.personRepository.create({
            id: user.person?.id,
            firstName: person.firstName
              ? person.firstName
              : user.person?.firstName,
            lastName: person?.lastName
              ? person.lastName
              : user.person?.lastName,
            telephone: person?.telephone
              ? person.telephone
              : user.person?.telephone,
            gender: person?.gender ? person.gender : user.person?.gender,
          })
        : user.person,
    });

    return this.userRepository.save(newUser);
  }

  async deleteUserById(user: User): Promise<User> {
    const { person } = user;

    if (person) {
      await this.personRepository.remove(person);
      return user;
    }

    return this.userRepository.remove(user);
  }
}

export default new UserService();

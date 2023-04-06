import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateUserDto, GetUsersQueryDto, UpdateUserDto } from "../dtos";
import { Gender, Person, User } from "../entities";

class UserService {
  private readonly genderRepository: Repository<Gender>;
  private readonly personRepository: Repository<Person>;
  private readonly userRepository: Repository<User>;

  constructor() {
    this.genderRepository = AppDataSource.getRepository(Gender);
    this.userRepository = AppDataSource.getRepository(User);
    this.personRepository = AppDataSource.getRepository(Person);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
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

    const newUser: User = this.userRepository.create({
      username,
      email,
      password,
      avatarUrl,
      roles,
      person: this.personRepository.create({
        firstName,
        lastName,
        telephone,
        gender: this.genderRepository.create({
          id: genderId,
        }),
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

    const newUser: User = this.userRepository.create({
      id: user.id,
      username,
      email,
      password,
      avatarUrl,
      roles,
      person: this.personRepository.create({
        id: user.person.id,
        firstName,
        lastName,
        telephone,
        gender: this.genderRepository.create({
          id: genderId,
        }),
      }),
    });

    return this.userRepository.save(newUser);
  }

  deleteUserById(user: User): Promise<Person> {
    return this.personRepository.remove(user.person);
  }
}

export default new UserService();

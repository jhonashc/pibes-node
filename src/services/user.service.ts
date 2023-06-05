import { FindOptionsWhere, Like, Repository } from "typeorm";

import { AppDataSource } from "../database";

import {
  CreateUserDto,
  GetUsersQueryDto,
  SearchUsersQueryDto,
  UpdateUserDto,
} from "../dtos";

import { Person, User, UserOtp, UserRole } from "../entities";

class UserService {
  private readonly personRepository: Repository<Person>;
  private readonly userRepository: Repository<User>;
  private readonly userOtpRepository: Repository<UserOtp>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.personRepository = AppDataSource.getRepository(Person);
    this.userOtpRepository = AppDataSource.getRepository(UserOtp);
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const { person, username, email, password, avatarUrl, roles } =
      createUserDto;

    const newUser: User = this.userRepository.create({
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password,
      avatarUrl,
      isActive: true,
      roles: roles?.length ? roles : [UserRole.USER],
      person:
        person &&
        this.personRepository.create({
          firstName: person.firstName?.trim().toLowerCase(),
          lastName: person.lastName?.trim().toLowerCase(),
          telephone: person.telephone?.trim().toLowerCase(),
          gender: person.gender,
        }),
    });

    return this.userRepository.save(newUser);
  }

  getUsers(getUsersQueryDto: GetUsersQueryDto): Promise<User[]> {
    const { limit = 10, offset = 0 } = getUsersQueryDto;

    return this.userRepository.find({
      take: limit,
      skip: offset,
    });
  }

  searchUsers(searchUsersQueryDto: SearchUsersQueryDto): Promise<User[]> {
    const { username, limit = 10, offset = 0 } = searchUsersQueryDto;

    const findOptionsWhere: FindOptionsWhere<User> = {};

    if (username) {
      findOptionsWhere.username = Like(`%${username.trim().toLowerCase()}%`);
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
        email: Like(email.trim().toLowerCase()),
      },
    });
  }

  getUserByUsername(username: string = "") {
    return this.userRepository.findOne({
      where: {
        username: Like(username.trim().toLowerCase()),
      },
    });
  }

  updateUserById(user: User, updateUserDto: UpdateUserDto): Promise<User> {
    const { person, username, avatarUrl, isActive, otp, roles } = updateUserDto;

    const newUser: User = this.userRepository.create({
      id: user.id,
      username: username?.trim().toLowerCase(),
      avatarUrl,
      isActive: user.isActive ? user.isActive : isActive,
      roles: roles?.length ? roles : user.roles,
      person: person
        ? this.personRepository.create({
            id: user.person?.id,
            firstName: person.firstName
              ? person.firstName.trim().toLowerCase()
              : user.person?.firstName,
            lastName: person.lastName
              ? person.lastName.trim().toLowerCase()
              : user.person?.lastName,
            telephone: person.telephone
              ? person.telephone.trim().toLowerCase()
              : user.person?.telephone,
            gender: person.gender ? person.gender : user.person?.gender,
          })
        : user.person,
      otp: otp
        ? this.userOtpRepository.create({
            id: user.otp.id,
            code: otp.code,
            expirationDate: otp.expirationDate,
          })
        : user.otp,
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

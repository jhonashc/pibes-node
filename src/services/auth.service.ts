import { Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateRegisterDto } from "../dtos";
import { Person, Roles, User, UserOtp } from "../entities";

class AuthService {
  private readonly personRepository: Repository<Person>;
  private readonly userRepository: Repository<User>;
  private readonly userOtpRepository: Repository<UserOtp>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
    this.personRepository = AppDataSource.getRepository(Person);
    this.userOtpRepository = AppDataSource.getRepository(UserOtp);
  }

  register(createRegisterDto: CreateRegisterDto) {
    const { person, username, email, password, avatarUrl, otp } =
      createRegisterDto;

    const newUser: User = this.userRepository.create({
      username: username.trim().toLowerCase(),
      email: email.trim().toLowerCase(),
      password,
      avatarUrl,
      roles: [Roles.USER],
      person:
        person &&
        this.personRepository.create({
          firstName: person.firstName?.trim().toLowerCase(),
          lastName: person.lastName?.trim().toLowerCase(),
          telephone: person.telephone?.trim().toLowerCase(),
          gender: person.gender,
        }),
      otp: this.userOtpRepository.create({
        code: otp.code,
        expirationDate: otp.expirationDate,
      }),
    });

    return this.userRepository.save(newUser);
  }
}

export default new AuthService();

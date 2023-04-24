import { NextFunction, Request, Response } from "express";

import { CreateLoginDto, CreateRegisterDto } from "../dtos";
import { User } from "../entities";
import { ConflictException, UnauthorizedException } from "../exceptions";
import { comparePasswords, generateToken } from "../helpers";
import { Token } from "../interfaces";
import { UserService } from "../services";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as CreateLoginDto;

      const userFound: User | null = await UserService.getUserByEmail(email);

      if (!userFound) {
        throw new UnauthorizedException("The email or password is incorrect");
      }

      const comparedPasswords: boolean = await comparePasswords(
        password,
        userFound.password
      );

      if (!comparedPasswords) {
        throw new UnauthorizedException("The email or password is incorrect");
      }

      const token: Token = generateToken(userFound);

      res.status(200).json({
        status: true,
        ...token,
      });
    } catch (error) {
      next(error);
    }
  }

  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { person, username, email, password, avatarUrl } =
        req.body as CreateRegisterDto;

      const filteredUsername: string = username.trim().toLowerCase();
      const filteredEmail: string = email.trim().toLowerCase();

      const userByUsernameFound: User | null =
        await UserService.getUserByUsername(filteredUsername);

      const userByEmailFound: User | null = await UserService.getUserByEmail(
        filteredEmail
      );

      if (userByUsernameFound || userByEmailFound) {
        throw new ConflictException(
          `The user with the username ${filteredUsername} or the email ${filteredEmail} already exists`
        );
      }

      const createRegisterDto: CreateRegisterDto = {
        person,
        username: filteredUsername,
        email: filteredEmail,
        password,
        avatarUrl,
      };

      const registerdUser: User = await UserService.createUser(
        createRegisterDto
      );

      const token: Token = generateToken(registerdUser);

      res.status(201).json({
        status: true,
        ...token,
      });
    } catch (error) {
      next(error);
    }
  }
}

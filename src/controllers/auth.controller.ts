import { NextFunction, Request, Response } from "express";

import { CreateLoginDto, CreateRegisterDto } from "../dtos";
import { Gender, User } from "../entities";

import {
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions";

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
      const {
        firstName,
        lastName,
        telephone,
        genderId,
        username,
        email,
        password,
        avatarUrl,
      } = req.body as CreateRegisterDto;

      const lowerCaseEmail: string = email.trim().toLowerCase();

      const userFound: User | null = await UserService.getUserByEmail(
        lowerCaseEmail
      );

      if (userFound) {
        throw new ConflictException(
          `The user with the email ${lowerCaseEmail} already exists`
        );
      }

      const createRegisterDto: CreateRegisterDto = {
        firstName,
        lastName,
        telephone,
        genderId,
        username,
        email: lowerCaseEmail,
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

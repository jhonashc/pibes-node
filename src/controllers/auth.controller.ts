import { NextFunction, Request, Response } from "express";

import {
  CreateLoginDto,
  CreateRefreshTokenDto,
  CreateRegisterDto,
} from "../dtos";

import { User } from "../entities";
import { ConflictException, UnauthorizedException } from "../exceptions";
import { comparePasswords, generateTokens, verifyToken } from "../helpers";
import { Payload, Token } from "../interfaces";
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

      const { accessToken, refreshToken }: Token = generateTokens(userFound);

      res.status(200).json({
        status: true,
        userId: userFound.id,
        roles: userFound.roles,
        accessToken,
        refreshToken,
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

      const registeredUser: User = await UserService.createUser(
        createRegisterDto
      );

      const { accessToken, refreshToken }: Token =
        generateTokens(registeredUser);

      res.status(201).json({
        status: true,
        userId: registeredUser.id,
        roles: registeredUser.roles,
        accessToken,
        refreshToken,
      });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      const { refreshToken } = req.body as CreateRefreshTokenDto;

      const { userId }: Payload = verifyToken(
        refreshToken,
        process.env.REFRESH_TOKEN_PRIVATE_KEY || "REFRESH_TOKEN_PRIVATE_KEY"
      );

      const userFound: User | null = await UserService.getUserById(userId);

      if (!userFound) {
        return next(new UnauthorizedException("The refresh token is invalid"));
      }

      const { accessToken }: Token = generateTokens(userFound);

      res.json({
        status: true,
        accessToken,
      });
    } catch (error) {
      next(new UnauthorizedException("The refresh token is invalid"));
    }
  }
}

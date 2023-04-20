import { NextFunction, Request, Response } from "express";

import { CreateLoginDto } from "../dtos";
import { User } from "../entities";
import { UnauthorizedException } from "../exceptions";
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
}

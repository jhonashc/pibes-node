import { NextFunction, Request, Response } from "express";

import {
  CreateLoginDto,
  CreateRefreshTokenDto,
  CreateRegisterDto,
  CreateResendEmailVerficationDto,
  CreateVerifyAccountDto,
  UpdateUserDto,
} from "../dtos";

import { User } from "../entities";

import {
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from "../exceptions";

import {
  comparePasswords,
  generateOpt,
  generateTokens,
  newUserEmailTemplate,
  verifyToken,
} from "../helpers";

import { Payload, Token } from "../interfaces";
import { AuthService, EmailService, UserService } from "../services";

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body as CreateLoginDto;

      const filteredEmail: string = email.trim().toLowerCase();

      const userFound: User | null = await UserService.getUserByEmail(
        filteredEmail
      );

      if (!userFound) {
        throw new UnauthorizedException(
          "El correo electrónico o la contraseña son incorrectos"
        );
      }

      const comparedPasswords: boolean = await comparePasswords(
        password,
        userFound.password
      );

      if (!comparedPasswords) {
        throw new UnauthorizedException(
          "El correo electrónico o la contraseña son incorrectos"
        );
      }

      if (!userFound.isActive) {
        throw new UnauthorizedException(
          `El usuario con el correo electrónico ${filteredEmail} aún no ha sido verificado`
        );
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
      const { person, username, email, password, avatarUrl, otp } =
        req.body as CreateRegisterDto;

      const filteredUsername: string = username.trim().toLowerCase();
      const filteredEmail: string = email.trim().toLowerCase();

      const userByUsernameFound: User | null =
        await UserService.getUserByUsername(filteredUsername);

      const userByEmailFound: User | null = await UserService.getUserByEmail(
        filteredEmail
      );

      if (userByUsernameFound) {
        throw new ConflictException(
          `El usuario con el nombre de usuario ${filteredUsername} ya existe`
        );
      }

      if (userByEmailFound) {
        throw new ConflictException(
          `El usuario con el correo electrónico ${filteredEmail} ya existe`
        );
      }

      const optCode: string = generateOpt();

      /* Expires in 10 minutes */
      const expirationDate: Date = new Date(Date.now() + 600000);

      const createRegisterDto: CreateRegisterDto = {
        person,
        username: filteredUsername,
        email: filteredEmail,
        password,
        avatarUrl,
        otp: {
          code: optCode,
          expirationDate,
        },
      };

      const registeredUser: User = await AuthService.register(
        createRegisterDto
      );

      await EmailService.sendEmail(
        newUserEmailTemplate(filteredEmail, filteredUsername, optCode)
      );

      res.status(201).json({
        status: true,
        message: "El usuario ha sido registrado con éxito",
        data: registeredUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async verifyAccount(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, otp } = req.body as CreateVerifyAccountDto;

      const filteredEmail: string = email.trim().toLowerCase();

      const userFound: User | null = await UserService.getUserByEmail(
        filteredEmail
      );

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con el correo electrónico ${filteredEmail} no ha sido encontrado`
        );
      }

      if (userFound.isActive) {
        throw new BadRequestException(
          `La cuenta con el correo electrónico ${filteredEmail} ya ha sido verificada`
        );
      }

      if (otp !== userFound.otp.code) {
        throw new BadRequestException(
          "El código de verificación OTP no es válido"
        );
      }

      if (userFound.otp.expirationDate < new Date()) {
        throw new BadRequestException(
          "El código de verificación OTP ha caducado"
        );
      }

      await UserService.updateUserById(userFound, {
        isActive: true,
      });

      res.json({
        status: true,
        message: "La cuenta ha sido verificada con éxito",
      });
    } catch (error) {
      next(error);
    }
  }

  async resendEmailVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email } = req.body as CreateResendEmailVerficationDto;

      const filteredEmail: string = email.trim().toLowerCase();

      const userFound: User | null = await UserService.getUserByEmail(
        filteredEmail
      );

      if (!userFound) {
        throw new NotFoundException(
          `El usuario con el correo electrónico ${filteredEmail} no ha sido encontrado`
        );
      }

      if (userFound.isActive) {
        throw new BadRequestException(
          `La cuenta con el correo electrónico ${filteredEmail} ya ha sido verificada`
        );
      }

      const optCode: string = generateOpt();

      /* Expires in 10 minutes */
      const expirationDate: Date = new Date(Date.now() + 600000);

      const updateUserDto: UpdateUserDto = {
        otp: {
          code: optCode,
          expirationDate,
        },
      };

      const updateUser: Promise<User> = UserService.updateUserById(
        userFound,
        updateUserDto
      );

      const sendEmail: Promise<void> = EmailService.sendEmail(
        newUserEmailTemplate(filteredEmail, userFound.username, optCode)
      );

      await Promise.all([updateUser, sendEmail]);

      res.json({
        status: true,
        message:
          "El correo electrónico de verificación ha sido enviado de nuevo",
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
        throw new UnauthorizedException("El token no es válido");
      }

      const { accessToken }: Token = generateTokens(userFound);

      res.json({
        status: true,
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
}

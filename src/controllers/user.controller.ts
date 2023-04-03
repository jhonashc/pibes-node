import { NextFunction, Request, Response } from "express";

import { CreateUserDto, GetUsersQueryDto } from "../dtos";
import { Gender, Role, User } from "../entities";
import { ConflictException, NotFoundException } from "../exceptions";
import { GenderService, RoleService, UserService } from "../services";

export class UserController {
  async createUser(req: Request, res: Response, next: NextFunction) {
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
        roleIds,
      } = req.body as CreateUserDto;

      const userFound: User | null = await UserService.getUserByEmail(email);

      if (userFound) {
        throw new ConflictException(
          `The user with the email ${email} already exists`
        );
      }

      const genderFound: Gender | null = await GenderService.getGenderById(
        genderId
      );

      if (!genderFound) {
        throw new NotFoundException(
          `The gender with id ${genderId} has not been found`
        );
      }

      const rolesFound: Role[] = await RoleService.getRolesByIds(roleIds);

      if (rolesFound.length !== roleIds.length) {
        throw new NotFoundException("The id of some role is invalid");
      }

      const createdUserDto: CreateUserDto = {
        firstName,
        lastName,
        telephone,
        genderId,
        username,
        email,
        password,
        avatarUrl,
        roleIds,
      };

      const createdUser: User | undefined = await UserService.createUser(
        createdUserDto
      );

      if (!createdUser) {
        throw new ConflictException("There was a problem creating the user");
      }

      res.status(201).json({
        status: true,
        data: createdUser,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, limit, offset } = req.query as GetUsersQueryDto;

      const users: User[] = await UserService.getUsers({
        username,
        limit,
        offset,
      });

      res.json({
        status: true,
        data: users,
      });
    } catch (error) {
      next(error);
    }
  }

  async getUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      res.json({
        status: true,
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteUserById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      const userFound: User | null = await UserService.getUserById(id);

      if (!userFound) {
        throw new NotFoundException(
          `The user with id ${id} has not been found`
        );
      }

      const deletedUser: User | undefined = await UserService.deleteUserById(
        userFound
      );

      console.log({ deletedUser });

      if (!deletedUser) {
        throw new ConflictException("There was a problem deleting the user");
      }

      res.json({
        status: true,
        data: deletedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}

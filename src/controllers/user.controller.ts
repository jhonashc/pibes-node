import { NextFunction, Request, Response } from "express";

import { GetUsersQueryDto } from "../dtos";
import { User } from "../entities";
import { UserService } from "../services";

export class UserController {
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
        return res.json({
          status: false,
          message: `The user with id ${id} has not been found`,
        });
      }

      res.json({
        status: true,
        data: userFound,
      });
    } catch (error) {
      next(error);
    }
  }
}

import { NextFunction, Response } from "express";

import { User } from "../entities";
import { NotFoundException, UnauthorizedException } from "../exceptions";
import { verifyToken } from "../helpers";
import { Payload, RequestWithUser } from "../interfaces";
import { UserService } from "../services";

export const isAuthenticated = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader: string | undefined = req.headers["authorization"];

    if (!authHeader) {
      return next(new NotFoundException("The token has not been provided"));
    }

    const token: string = authHeader.split(" ")[1];

    const { userId }: Payload = verifyToken(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY || "ACCESS_TOKEN_PRIVATE_KEY"
    );

    const userFound: User | null = await UserService.getUserById(userId);

    if (!userFound) {
      return next(new UnauthorizedException("The token is invalid"));
    }

    req.user = userFound;

    next();
  } catch (error) {
    next(new UnauthorizedException("The token is invalid"));
  }
};

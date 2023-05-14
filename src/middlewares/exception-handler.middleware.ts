import { NextFunction, Request, Response } from "express";

import { BaseError } from "../exceptions";
import { JsonWebTokenError } from "jsonwebtoken";

export const exceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof BaseError) {
    const { message, statusCode } = error;

    res.status(statusCode).json({
      success: false,
      message,
    });
  } else if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      status: false,
      message: "The token is invalid",
    });
  } else {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

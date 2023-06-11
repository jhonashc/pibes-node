import { unlinkSync } from "fs";
import { JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { BaseError } from "../exceptions";

export const exceptionHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file;

  if (file) unlinkSync(file.path);

  if (error instanceof BaseError) {
    const { message, statusCode } = error;

    res.status(statusCode).json({
      status: false,
      message,
    });
  } else if (error instanceof JsonWebTokenError) {
    res.status(401).json({
      status: false,
      message: "El token no es válido",
    });
  } else {
    res.status(500).json({
      status: false,
      message: "Algo salió mal, inténtalo de nuevo más tarde",
    });
  }
};

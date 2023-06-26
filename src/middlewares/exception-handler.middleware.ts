import { JsonWebTokenError } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import { BaseError } from "../exceptions";
import { FileService } from "../services";

export const exceptionHandler = async (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const file = req.file as Express.Multer.File;
  const files = req.files as Express.Multer.File[];

  if (file) {
    const fileName: string = file.filename;
    await FileService.deleteImageByName(fileName);
  }

  if (files) {
    const fileNames: string[] = files.map(({ filename }) => filename);
    await FileService.deleteImagesByName(fileNames);
  }

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

import { join } from "path";
import { existsSync } from "fs";
import { NextFunction, Request, Response } from "express";

import { BadRequestException } from "../exceptions";

export class FileController {
  async uploadImage(req: Request, res: Response, next: NextFunction) {
    try {
      const file = req.file;

      if (!file) {
        throw new BadRequestException(
          "Asegúrate de que el archivo sea una imagen"
        );
      }

      res.status(201).json({
        status: true,
        data: file.filename,
      });
    } catch (error) {
      next(error);
    }
  }

  async getImageByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { imageName } = req.params;

      const path = join(__dirname, "../../static/images", imageName);

      if (!existsSync(path)) {
        throw new BadRequestException(
          `La imagen con el nombre ${imageName} no ha sido encontrada`
        );
      }

      res.sendFile(path);
    } catch (error) {
      next(error);
    }
  }
}

import path from "path";
import fs from "fs-extra";
import { Request } from "express";
import multer, { FileFilterCallback } from "multer";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const storage: multer.StorageEngine = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    cb: DestinationCallback
  ): void => {
    const filePath: string = path.join("public", "uploads");

    fs.mkdirSync(filePath, {
      recursive: true,
    });

    cb(null, filePath);
  },
  filename: (
    request: Request,
    file: Express.Multer.File,
    cb: FileNameCallback
  ) => {
    const ext: string = file.mimetype.split("/")[1];
    cb(null, `${file.originalname}-${Date.now()}.${ext}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const fileTypes = /jpeg|jpg|png/;
  const mimeType = fileTypes.test(file.mimetype);
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (!mimeType || !extName) {
    return cb(null, false);
  }

  cb(null, true);
};

export const uploader: multer.Multer = multer({ storage, fileFilter });

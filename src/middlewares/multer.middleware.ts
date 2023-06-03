import multer from "multer";

import { fileFilter, fileNamer } from "../helpers";

const storage: multer.StorageEngine = multer.diskStorage({
  destination: "./static/images",
  filename: fileNamer,
});

export const uploader: multer.Multer = multer({
  storage,
  fileFilter,
});

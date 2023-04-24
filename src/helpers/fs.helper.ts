import fs from "fs-extra";
import path from "path";

export const deleteFile = (filePath: string): Promise<void> => {
  return fs.unlink(path.resolve(filePath));
};

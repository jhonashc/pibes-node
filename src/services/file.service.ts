import { join } from "path";
import { unlink } from "fs-extra";

class FileService {
  private readonly staticFolderPath: string;

  constructor() {
    this.staticFolderPath = join(__dirname, "../../static/images");
  }

  getImageByName(name: string): string {
    return join(this.staticFolderPath, name);
  }

  deleteImageByName(name: string): Promise<void> {
    const imagePath: string = join(this.staticFolderPath, name);
    return unlink(imagePath);
  }

  deleteImagesByName(names: string[]): Promise<void[]> {
    const imagePaths: string[] = names.map((name) =>
      join(this.staticFolderPath, name)
    );

    const unlinkFiles: Promise<void>[] = imagePaths.map((imagePath) =>
      unlink(imagePath)
    );

    return Promise.all(unlinkFiles);
  }
}

export default new FileService();

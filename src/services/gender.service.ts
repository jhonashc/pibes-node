import { Repository } from "typeorm";

import { AppDataSource } from "../config";
import { Gender } from "../entities";

class GenderService {
  private readonly genderRepository: Repository<Gender>;

  constructor() {
    this.genderRepository = AppDataSource.getRepository(Gender);
  }

  getGenderById(id: string): Promise<Gender | null> {
    return this.genderRepository.findOne({
      where: {
        id,
      },
    });
  }
}

export default new GenderService();

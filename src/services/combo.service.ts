import {
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from "typeorm";

import { AppDataSource } from "../config";
import { CreateComboDto, GetCombosQueryDto, UpdateComboDto } from "../dtos";
import { Combo } from "../entities";

class ComboService {
  private readonly comboRepository: Repository<Combo>;

  constructor() {
    this.comboRepository = AppDataSource.getRepository(Combo);
  }

  createCombo(createComboDto: CreateComboDto): Promise<Combo> {
    return this.comboRepository.save(createComboDto);
  }

  getCombos(getCombosQueryDto: GetCombosQueryDto): Promise<Combo[]> {
    const { name, min, max, limit = 10, offset = 0 } = getCombosQueryDto;

    const findOptionsWhere: FindOptionsWhere<Combo> = {};

    if (name) {
      findOptionsWhere.name = Like(`%${name}%`);
    }

    if (min) {
      findOptionsWhere.price = LessThanOrEqual(min);
    }

    if (max) {
      findOptionsWhere.price = MoreThanOrEqual(max);
    }

    return this.comboRepository.find({
      where: findOptionsWhere,
      take: limit,
      skip: offset,
    });
  }

  getComboById(id: string): Promise<Combo | null> {
    return this.comboRepository.findOne({
      where: {
        id,
      },
    });
  }

  getComboByName(name: string): Promise<Combo | null> {
    return this.comboRepository.findOne({
      where: {
        name: Like(name),
      },
    });
  }

  updateComboById(
    combo: Combo,
    updateComboDto: UpdateComboDto
  ): Promise<Combo> {
    const { name, imageUrl, price } = updateComboDto;

    const newCombo: Combo = this.comboRepository.create({
      id: combo.id,
      name,
      imageUrl,
      price,
    });

    return this.comboRepository.save(newCombo);
  }

  deleteComboById(combo: Combo): Promise<Combo> {
    return this.comboRepository.remove(combo);
  }
}

export default new ComboService();

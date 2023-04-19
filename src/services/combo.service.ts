import {
  FindOptionsWhere,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Repository,
} from "typeorm";

import { AppDataSource } from "../config";
import { CreateComboDto, GetCombosQueryDto, UpdateComboDto } from "../dtos";
import { Combo, ProductCombo } from "../entities";

class ComboService {
  private readonly comboRepository: Repository<Combo>;
  private readonly productComboRepository: Repository<ProductCombo>;

  constructor() {
    this.comboRepository = AppDataSource.getRepository(Combo);
    this.productComboRepository = AppDataSource.getRepository(ProductCombo);
  }

  createCombo(createComboDto: CreateComboDto): Promise<Combo> {
    const { name, description, price, imageUrl, productIds } = createComboDto;

    const newCombo: Combo = this.comboRepository.create({
      name,
      description,
      price,
      imageUrl,
      products: productIds.map((productId) =>
        this.productComboRepository.create({
          product: {
            id: productId,
          },
        })
      ),
    });

    return this.comboRepository.save(newCombo);
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

  async updateComboById(
    combo: Combo,
    updateComboDto: UpdateComboDto
  ): Promise<Combo | undefined> {
    const { name, description, imageUrl, price, productIds } = updateComboDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newCombo: Combo = this.comboRepository.create({
        id: combo.id,
        name,
        description,
        imageUrl,
        price,
      });

      if (productIds?.length) {
        await this.productComboRepository.delete({
          combo: {
            id: combo.id,
          },
        });

        newCombo.products = productIds.map((productId) =>
          this.productComboRepository.create({
            product: {
              id: productId,
            },
          })
        );
      }

      const updatedCombo: Combo = await this.comboRepository.save(newCombo);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return updatedCombo;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  deleteComboById(combo: Combo): Promise<Combo> {
    return this.comboRepository.remove(combo);
  }
}

export default new ComboService();

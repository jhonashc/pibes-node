import {
  FindOptionsWhere,
  In,
  LessThanOrEqual,
  Like,
  MoreThanOrEqual,
  Not,
  Repository,
} from "typeorm";

import { AppDataSource } from "../config";

import {
  CreateComboDto,
  GetCombosQueryDto,
  GetSimilarCombosQueryDto,
  UpdateComboDto,
} from "../dtos";

import { Combo, ComboCategory, ComboProduct } from "../entities";

class ComboService {
  private readonly comboRepository: Repository<Combo>;
  private readonly comboProductRepository: Repository<ComboProduct>;
  private readonly comboCategoryRepository: Repository<ComboCategory>;

  constructor() {
    this.comboRepository = AppDataSource.getRepository(Combo);
    this.comboProductRepository = AppDataSource.getRepository(ComboProduct);
    this.comboCategoryRepository = AppDataSource.getRepository(ComboCategory);
  }

  createCombo(createComboDto: CreateComboDto): Promise<Combo> {
    const { name, description, price, imageUrl, categoryIds, products } =
      createComboDto;

    const newCombo: Combo = this.comboRepository.create({
      name: name.trim().toLowerCase(),
      description,
      price,
      imageUrl,
      categories: categoryIds.map((categoryId) =>
        this.comboCategoryRepository.create({
          category: {
            id: categoryId,
          },
        })
      ),
      products: products.map(({ id, quantity }) =>
        this.comboProductRepository.create({
          product: {
            id,
          },
          quantity,
        })
      ),
    });

    return this.comboRepository.save(newCombo);
  }

  getCombos(getCombosQueryDto: GetCombosQueryDto): Promise<Combo[]> {
    const { name, min, max, limit = 10, offset = 0 } = getCombosQueryDto;

    const findOptionsWhere: FindOptionsWhere<Combo> = {};

    if (name) {
      findOptionsWhere.name = Like(`%${name.trim().toLowerCase()}%`);
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

  getSimilarCombos(
    id: string,
    categoryIds: string[],
    getSimilarCombosQueryDto: GetSimilarCombosQueryDto
  ): Promise<Combo[]> {
    const { limit = 10, offset = 0 } = getSimilarCombosQueryDto;

    return this.comboRepository.find({
      where: {
        id: Not(id),
        categories: {
          category: {
            id: In(categoryIds),
          },
        },
      },
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
        name: Like(name.trim().toLowerCase()),
      },
    });
  }

  getCombosByIds(comboIds: string[]): Promise<Combo[]> {
    return this.comboRepository.find({
      where: {
        id: In(comboIds),
      },
    });
  }

  async updateComboById(
    combo: Combo,
    updateComboDto: UpdateComboDto
  ): Promise<Combo | undefined> {
    const { name, description, imageUrl, price, categoryIds, products } =
      updateComboDto;

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newCombo: Combo = this.comboRepository.create({
        id: combo.id,
        name: name?.trim().toLowerCase(),
        description,
        imageUrl,
        price,
      });

      if (categoryIds) {
        await this.comboCategoryRepository.delete({
          combo: {
            id: combo.id,
          },
        });

        newCombo.categories = categoryIds.map((categoryId) =>
          this.comboCategoryRepository.create({
            category: {
              id: categoryId,
            },
          })
        );
      }

      if (products?.length) {
        await this.comboProductRepository.delete({
          combo: {
            id: combo.id,
          },
        });

        newCombo.products = products.map(({ id, quantity }) =>
          this.comboProductRepository.create({
            product: {
              id,
            },
            quantity,
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

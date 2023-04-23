import { Repository } from "typeorm";

import { AppDataSource } from "../config";

import {
  CreateFavoriteComboDto,
  CreateFavoriteProductDto,
  GetFavoriteCombosQueryDto,
  GetFavoriteProductsQueryDto,
} from "../dtos";

import { FavoriteCombo, FavoriteProduct } from "../entities";

class FavoriteService {
  private readonly favoriteComboRepository: Repository<FavoriteCombo>;
  private readonly favoriteProductRepository: Repository<FavoriteProduct>;

  constructor() {
    this.favoriteComboRepository = AppDataSource.getRepository(FavoriteCombo);
    this.favoriteProductRepository =
      AppDataSource.getRepository(FavoriteProduct);
  }

  createFavoriteCombo(
    createFavoriteComboDto: CreateFavoriteComboDto
  ): Promise<FavoriteCombo> {
    const { comboId, userId } = createFavoriteComboDto;

    const newFavoriteCombo: FavoriteCombo = this.favoriteComboRepository.create(
      {
        combo: {
          id: comboId,
        },
        user: {
          id: userId,
        },
      }
    );

    return this.favoriteComboRepository.save(newFavoriteCombo);
  }

  createFavoriteProduct(
    createFavoriteProductDto: CreateFavoriteProductDto
  ): Promise<FavoriteProduct> {
    const { productId, userId } = createFavoriteProductDto;

    const newFavoriteProduct: FavoriteProduct =
      this.favoriteProductRepository.create({
        product: {
          id: productId,
        },
        user: {
          id: userId,
        },
      });

    return this.favoriteProductRepository.save(newFavoriteProduct);
  }

  getFavoriteCombos(
    userId: string,
    getFavoriteCombosQueryDto: GetFavoriteCombosQueryDto
  ): Promise<FavoriteCombo[]> {
    const { limit = 10, offset = 0 } = getFavoriteCombosQueryDto;

    return this.favoriteComboRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        combo: true,
      },
      take: limit,
      skip: offset,
    });
  }

  getFavoriteProducts(
    userId: string,
    getFavoriteProductsQueryDto: GetFavoriteProductsQueryDto
  ): Promise<FavoriteProduct[]> {
    const { limit = 10, offset = 0 } = getFavoriteProductsQueryDto;

    return this.favoriteProductRepository.find({
      where: {
        user: {
          id: userId,
        },
      },
      relations: {
        product: true,
      },
      take: limit,
      skip: offset,
    });
  }

  getFavoriteCombo(
    comboId: string,
    userId: string
  ): Promise<FavoriteCombo | null> {
    return this.favoriteComboRepository.findOne({
      where: {
        combo: {
          id: comboId,
        },
        user: {
          id: userId,
        },
      },
    });
  }

  getFavoriteProduct(
    productId: string,
    userId: string
  ): Promise<FavoriteProduct | null> {
    return this.favoriteProductRepository.findOne({
      where: {
        product: {
          id: productId,
        },
        user: {
          id: userId,
        },
      },
    });
  }

  deleteFavoriteCombo(favoriteCombo: FavoriteCombo): Promise<FavoriteCombo> {
    return this.favoriteComboRepository.remove(favoriteCombo);
  }

  deleteFavoriteProduct(
    favoriteProduct: FavoriteProduct
  ): Promise<FavoriteProduct> {
    return this.favoriteProductRepository.remove(favoriteProduct);
  }
}

export default new FavoriteService();

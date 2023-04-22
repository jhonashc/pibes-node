import { Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateFavoriteComboDto, CreateFavoriteProductDto } from "../dtos";
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

import { Repository } from "typeorm";

import { AppDataSource } from "../config";
import { CreateFavoriteProductDto, GetFavoriteProductsQueryDto } from "../dtos";
import { FavoriteProduct } from "../entities";

class FavoriteService {
  private readonly favoriteProductRepository: Repository<FavoriteProduct>;

  constructor() {
    this.favoriteProductRepository =
      AppDataSource.getRepository(FavoriteProduct);
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

  deleteFavoriteProduct(
    favoriteProduct: FavoriteProduct
  ): Promise<FavoriteProduct> {
    return this.favoriteProductRepository.remove(favoriteProduct);
  }
}

export default new FavoriteService();

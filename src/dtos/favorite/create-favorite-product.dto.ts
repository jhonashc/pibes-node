import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateFavoriteProductDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  userId: string;
}

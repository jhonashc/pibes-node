import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateFavoriteProductDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

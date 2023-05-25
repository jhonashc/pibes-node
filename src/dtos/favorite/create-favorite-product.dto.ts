import { IsNotEmpty, IsUUID } from "class-validator-multi-lang";

export class CreateFavoriteProductDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  userId: string;
}

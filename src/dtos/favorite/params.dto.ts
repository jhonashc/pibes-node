import { IsUUID } from "class-validator";

export class FavoriteProductIdParamDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  userId: string;
}

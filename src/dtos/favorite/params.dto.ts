import { IsUUID } from "class-validator-multi-lang";

export class FavoriteProductIdParamDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  userId: string;
}

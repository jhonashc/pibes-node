import { IsUUID } from "class-validator";

export class FavoriteComboIdParamDto {
  @IsUUID()
  comboId: string;

  @IsUUID()
  userId: string;
}

export class FavoriteProductIdParamDto {
  @IsUUID()
  productId: string;

  @IsUUID()
  userId: string;
}

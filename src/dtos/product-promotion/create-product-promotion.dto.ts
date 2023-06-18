import { ArrayNotEmpty, IsArray, IsUUID } from "class-validator-multi-lang";

export class CreateProductPromotionDto {
  productId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  promotionIds: string[];
}

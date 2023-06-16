import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsOptional,
  IsPositive,
  IsUUID,
} from "class-validator-multi-lang";

export class UpdateOrderItemDto {
  @IsUUID()
  @IsOptional()
  productId?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  quantity?: number;

  /* Promotions */
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  promotionIds?: string[];
}

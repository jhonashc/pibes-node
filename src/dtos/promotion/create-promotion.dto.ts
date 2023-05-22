import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from "class-validator";

import { Days } from "../../entities";

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsOptional()
  discountPercentage?: number;

  @IsEnum(Days)
  availableDay: Days;

  @IsUUID("4", {
    each: true,
  })
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  productIds?: string[];
}

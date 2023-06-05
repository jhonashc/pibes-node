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
} from "class-validator-multi-lang";

import { DayOfWeek } from "../../entities";

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

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(DayOfWeek, { each: true })
  availableDays: DayOfWeek[];

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  productIds?: string[];
}

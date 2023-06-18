import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from "class-validator-multi-lang";

import { DayOfWeek } from "../../entities";

export class UpdatePromotionDto {
  @IsString()
  @IsOptional()
  name?: string;

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
  @Type(() => Number)
  discountPercentage?: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(DayOfWeek, { each: true })
  availableDays?: DayOfWeek[];
}

import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  ValidateNested,
} from "class-validator";

import { CreateComboProductDto } from "./create-product-combo.dto";

export class UpdateComboDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsUUID("4", {
    each: true,
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsOptional()
  categoryIds?: string[];

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateComboProductDto)
  products?: CreateComboProductDto[];
}

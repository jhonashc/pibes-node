import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";

import { CreateProductComboDto } from "./create-product-combo.dto";

export class CreateComboDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductComboDto)
  products: CreateProductComboDto[];
}

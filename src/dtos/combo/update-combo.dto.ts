import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";
import { CreateProductComboDto } from "./create-product-combo.dto";
import { Type } from "class-transformer";

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

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateProductComboDto)
  products?: CreateProductComboDto[];
}

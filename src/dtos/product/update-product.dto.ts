import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from "class-validator-multi-lang";

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  price?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  stock?: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images?: string[];

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  categoryIds?: string[];
}

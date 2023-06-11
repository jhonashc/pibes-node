import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from "class-validator-multi-lang";

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  price: number;

  @IsInt()
  @IsPositive()
  @Type(() => Number)
  stock: number;

  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsString({ each: true })
  images?: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  categoryIds: string[];
}

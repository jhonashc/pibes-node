import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";
import { Type } from "class-transformer";

export class GetProductsQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  min?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  max?: number;
}

export class GetSimilarProductsQueryDto extends PaginationQueryDto {}

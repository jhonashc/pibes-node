import { Type } from "class-transformer";
import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetProductsQueryDto extends PaginationQueryDto {}

export class SearchProductsQueryDto extends PaginationQueryDto {
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

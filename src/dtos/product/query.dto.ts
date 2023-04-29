import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

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
  min?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  max?: number;
}

export class GetSimilarProductsQueryDto extends PaginationQueryDto {}

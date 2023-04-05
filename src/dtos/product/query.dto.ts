import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetProductsQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  category?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  min?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  max?: number;
}

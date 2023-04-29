import { IsInt, IsOptional, IsPositive, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetCombosQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  min?: number;

  @IsInt()
  @IsPositive()
  @IsOptional()
  max?: number;
}

export class GetSimilarCombosQueryDto extends PaginationQueryDto {}

import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetCombosQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  min?: number;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  max?: number;
}

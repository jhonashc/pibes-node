import { Type } from "class-transformer";
import { IsOptional, IsPositive, Max, Min } from "class-validator-multi-lang";

export class PaginationQueryDto {
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page?: number;

  @Min(5)
  @Max(20)
  @IsOptional()
  @Type(() => Number)
  limit?: number;
}

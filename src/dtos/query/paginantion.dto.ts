import { Type } from "class-transformer";
import { IsOptional, IsPositive, Max, Min } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  @Min(5)
  @Max(20)
  @Type(() => Number)
  limit?: number;

  @IsOptional()
  @Min(0)
  @Max(20)
  @Type(() => Number)
  offset?: number;
}

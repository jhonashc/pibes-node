import { IsEnum, IsOptional } from "class-validator-multi-lang";

import { DayOfWeek } from "../../entities";

import { PaginationQueryDto } from "../query";

export class GetPromotionsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(DayOfWeek)
  day?: DayOfWeek;
}

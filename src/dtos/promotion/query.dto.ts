import { IsEnum, IsOptional } from "class-validator-multi-lang";

import { Days } from "../../entities";

import { PaginationQueryDto } from "../query";

export class GetPromotionsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsEnum(Days)
  day?: Days;
}

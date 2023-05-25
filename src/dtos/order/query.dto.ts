import { IsEnum, IsOptional, IsString } from "class-validator-multi-lang";

import { OrderStatus } from "../../entities";

import { PaginationQueryDto } from "../query";

export class GetOrdersQueryDto extends PaginationQueryDto {}

export class SearchOrdersQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  user?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}

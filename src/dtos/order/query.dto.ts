import { IsEnum, IsOptional, IsString } from "class-validator";

import { OrderStatus } from "../../entities";
import { PaginationQueryDto } from "../query";

export class GetOrdersQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  user?: string;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;
}

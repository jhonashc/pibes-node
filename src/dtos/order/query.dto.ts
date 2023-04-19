import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetOrdersQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  user?: string;
}

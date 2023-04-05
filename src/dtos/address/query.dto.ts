import { IsOptional, IsUUID } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetAddressesQueryDto extends PaginationQueryDto {
  @IsUUID()
  @IsOptional()
  userId?: string;
}

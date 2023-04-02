import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetRolesQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  name?: string;
}

import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetUsersQueryDto extends PaginationQueryDto {}

export class SearchUsersQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  username?: string;
}

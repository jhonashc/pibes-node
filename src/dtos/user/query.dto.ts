import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetUsersQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  username?: string;
}

import { IsOptional, IsString } from "class-validator";

import { PaginationQueryDto } from "../query";

export class GetCategoriesQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;
}

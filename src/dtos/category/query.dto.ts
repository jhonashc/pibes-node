import { IsOptional, IsString } from "class-validator-multi-lang";

import { PaginationQueryDto } from "../query";

export class GetCategoriesQueryDto extends PaginationQueryDto {}

export class SearchCategoriesQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  name?: string;
}

import { IsOptional, IsString } from "class-validator-multi-lang";

export class UpdateCategoryDto {
  @IsString()
  @IsOptional()
  name?: string;
}

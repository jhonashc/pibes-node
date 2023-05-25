import { IsNotEmpty, IsString } from "class-validator-multi-lang";

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}

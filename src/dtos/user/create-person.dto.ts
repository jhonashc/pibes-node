import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

import { Gender } from "../../entities";

export class CreatePersonDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(10)
  telephone?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}

import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";

import { CreatePersonDto } from "../user";

export class CreateRegisterDto {
  /* Person */
  /* Person */
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreatePersonDto)
  person?: CreatePersonDto;

  /* User */
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

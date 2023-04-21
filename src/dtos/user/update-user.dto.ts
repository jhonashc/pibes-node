import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { Roles } from "../../entities";

import { CreatePersonDto } from "./create-person.dto";

export class UpdateUserDto {
  /* Person */
  @IsOptional()
  @ValidateNested()
  @IsNotEmptyObject()
  @Type(() => CreatePersonDto)
  person?: CreatePersonDto;

  /* User */
  @IsString()
  @IsOptional()
  username?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  /* Roles */
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(Roles, {
    each: true,
  })
  roles?: Roles[];
}

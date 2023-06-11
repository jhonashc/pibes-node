import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator-multi-lang";

import { UserRole } from "../../entities";

import { CreatePersonDto } from "./create-person.dto";

export class CreateUserDto {
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

  /* Roles */
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];
}

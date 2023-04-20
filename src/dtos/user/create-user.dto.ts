import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

import { Roles } from "../../entities";

export class CreateUserDto {
  /* Person */
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  telephone: string;

  @IsUUID()
  @IsNotEmpty()
  genderId: string;

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
  @IsEnum(Roles, {
    each: true,
  })
  roles?: Roles[];
}

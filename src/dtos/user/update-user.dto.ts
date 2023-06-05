import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmptyObject,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator-multi-lang";

import { UserRole } from "../../entities";

import { CreateUserOtpDto } from "../auth";

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

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  /* User Otp */
  otp?: CreateUserOtpDto;

  /* Roles */
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(UserRole, { each: true })
  roles?: UserRole[];
}

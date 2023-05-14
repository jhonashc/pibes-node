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
} from "class-validator";

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

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  /* Roles */
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsEnum(Roles, {
    each: true,
  })
  roles?: Roles[];
}

import {
  IsArray,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class UpdateUserDto {
  /* Person */
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  telephone?: string;

  @IsUUID()
  @IsOptional()
  genderId?: string;

  /* User */
  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  /* Roles */
  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  roles?: string[];
}

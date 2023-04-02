import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
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
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  avatarUrl?: string;

  /* Roles */
  @IsUUID("4", {
    each: true,
  })
  @IsArray()
  roleIds: string[];
}

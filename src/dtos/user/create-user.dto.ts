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
  @IsString({
    each: true,
  })
  @IsArray()
  @IsOptional()
  roles?: string[];
}

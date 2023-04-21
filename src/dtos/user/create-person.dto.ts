import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";

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

  @IsUUID()
  @IsNotEmpty()
  @IsOptional()
  genderId?: string;
}

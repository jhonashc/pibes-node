import { IsEmail, IsNotEmpty, IsString } from "class-validator-multi-lang";

export class CreateLoginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

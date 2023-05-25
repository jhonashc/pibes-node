import { IsEmail, IsNotEmpty, IsString } from "class-validator-multi-lang";

export class CreateVerifyAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateVerifyAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

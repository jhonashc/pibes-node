import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateVerifyOtpDtp {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  otp: string;
}

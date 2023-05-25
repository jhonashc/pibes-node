import { IsEmail, IsNotEmpty } from "class-validator-multi-lang";

export class CreateResendEmailVerficationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

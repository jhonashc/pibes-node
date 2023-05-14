import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateResendEmailVerficationDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

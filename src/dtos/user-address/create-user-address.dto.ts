import { IsNotEmpty, IsString } from "class-validator";

export class CreateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsNotEmpty()
  addressLine2: string;

  @IsString()
  @IsNotEmpty()
  addressReference: string;
}

import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateAddressDto {
  @IsString()
  @IsNotEmpty()
  addressLine1: string;

  @IsString()
  @IsNotEmpty()
  addressLine2: string;

  @IsString()
  @IsNotEmpty()
  addressReference: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

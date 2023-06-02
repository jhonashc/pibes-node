import { IsNotEmpty, IsOptional, IsString } from "class-validator-multi-lang";

export class CreateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  sideStreet: string;

  @IsString()
  @IsNotEmpty()
  deliveryInstruction: string;
}

import { IsOptional, IsString } from "class-validator-multi-lang";

export class UpdateUserAddressDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  sideStreet?: string;

  @IsString()
  @IsOptional()
  deliveryInstruction?: string;
}

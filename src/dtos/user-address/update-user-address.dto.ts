import { IsNotEmpty, IsOptional, IsString } from "class-validator-multi-lang";

export class UpdateUserAddressDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  addressLine1?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  addressReference?: string;
}

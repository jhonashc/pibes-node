import { IsOptional, IsString } from "class-validator";

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  addressLine1?: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @IsOptional()
  addressReference?: string;
}

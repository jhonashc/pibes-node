import { IsUUID } from "class-validator-multi-lang";

export class UserAddressIdParamDto {
  @IsUUID()
  addressId: string;

  @IsUUID()
  userId: string;
}

import { IsUUID } from "class-validator";

export class UserAddressIdParamDto {
  @IsUUID()
  addressId: string;

  @IsUUID()
  userId: string;
}

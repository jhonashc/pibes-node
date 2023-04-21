import { IsUUID } from "class-validator";

export class UserAddressUuidParamDto {
  @IsUUID()
  addressId: string;

  @IsUUID()
  userId: string;
}

import { IsUUID } from "class-validator";

export class AddressUuidParamDto {
  @IsUUID()
  addressId: string;
}

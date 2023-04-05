import { IsUUID } from "class-validator";

export class UserUuidParamDto {
  @IsUUID()
  userId: string;
}

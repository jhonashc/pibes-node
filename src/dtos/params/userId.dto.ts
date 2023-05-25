import { IsUUID } from "class-validator-multi-lang";

export class UserIdParamDto {
  @IsUUID()
  userId: string;
}

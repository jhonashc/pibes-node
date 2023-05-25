import { IsUUID } from "class-validator-multi-lang";

export class IdParamDto {
  @IsUUID()
  id: string;
}

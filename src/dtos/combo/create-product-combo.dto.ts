import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from "class-validator";

export class CreateComboProductDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  quantity?: number;
}

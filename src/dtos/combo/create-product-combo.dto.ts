import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from "class-validator";

export class CreateProductComboDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  quantity?: number;
}

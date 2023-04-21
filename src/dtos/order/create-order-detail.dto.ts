import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUUID,
} from "class-validator";

export class CreateOrderDetailDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsBoolean()
  @IsNotEmpty()
  isCombo: boolean;

  @IsInt()
  @IsPositive()
  quantity: number;
}

import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
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

  @IsNumber()
  @IsPositive()
  price: number;
}

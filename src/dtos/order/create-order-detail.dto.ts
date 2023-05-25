import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsUUID,
} from "class-validator-multi-lang";

export class CreateOrderDetailDto {
  @IsUUID()
  @IsNotEmpty()
  productId: string;

  @IsInt()
  @IsPositive()
  quantity: number;
}

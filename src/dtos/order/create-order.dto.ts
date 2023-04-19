import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { ORDER_STATUS, PAYMENT_METHODS } from "../../entities";
import { CreateOrderDetail } from "./create-order-detail.dto";

export class CreateOrderDto {
  @IsEnum(PAYMENT_METHODS)
  paymentMethod: PAYMENT_METHODS;

  @IsEnum(ORDER_STATUS)
  orderStatus: ORDER_STATUS;

  @IsNumber()
  @IsPositive()
  subtotal: number;

  @IsNumber()
  @IsPositive()
  total: number;

  /* User */
  @IsUUID()
  @IsNotEmpty()
  userId: string;

  /* Details */
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderDetail)
  details: CreateOrderDetail[];
}

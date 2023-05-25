import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsUUID,
  ValidateNested,
} from "class-validator-multi-lang";

import { DeliveryType, OrderStatus, PaymentMethods } from "../../entities";

import { CreateOrderDetailDto } from "./create-order-detail.dto";

export class CreateOrderDto {
  @IsEnum(DeliveryType)
  deliveryType: DeliveryType;

  @IsEnum(PaymentMethods)
  paymentMethod: PaymentMethods;

  @IsEnum(OrderStatus)
  status: OrderStatus;

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
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateOrderDetailDto)
  details: CreateOrderDetailDto[];
}

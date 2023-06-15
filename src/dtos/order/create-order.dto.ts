import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
  ValidateNested,
} from "class-validator-multi-lang";

import { DeliveryType, OrderStatus, PaymentMethods } from "../../entities";

import { CreateOrderItemDto } from "./create-order-item.dto";

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

  /* Address */
  @IsUUID()
  @IsOptional()
  addressId?: string;

  /* Items */
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}

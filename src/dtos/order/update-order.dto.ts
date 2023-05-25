import { Type } from "class-transformer";
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from "class-validator-multi-lang";

import {
  DeliveryStatus,
  DeliveryType,
  OrderStatus,
  PaymentMethods,
} from "../../entities";

import { CreateOrderDetailDto } from "./create-order-detail.dto";

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(DeliveryStatus)
  deliveryStatus?: DeliveryStatus;

  @IsOptional()
  @IsEnum(DeliveryType)
  deliveryType?: DeliveryType;

  @IsOptional()
  @IsEnum(PaymentMethods)
  paymentMethod?: PaymentMethods;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  total?: number;

  /* Details */
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @ValidateNested({
    each: true,
  })
  @Type(() => CreateOrderDetailDto)
  details?: CreateOrderDetailDto[];
}

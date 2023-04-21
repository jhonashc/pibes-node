import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  ValidateNested,
} from "class-validator";
import { Type } from "class-transformer";

import { OrderStatus, PaymentMethods } from "../../entities";

import { CreateOrderDetailDto } from "./create-order-detail.dto";

export class UpdateOrderDto {
  @IsOptional()
  @IsEnum(PaymentMethods)
  paymentMethod?: PaymentMethods;

  @IsOptional()
  @IsEnum(OrderStatus)
  status?: OrderStatus;

  @IsNumber()
  @IsOptional()
  @IsPositive()
  subtotal?: number;

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

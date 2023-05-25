import { IsNotEmpty, IsString } from "class-validator-multi-lang";

export class CreateRefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

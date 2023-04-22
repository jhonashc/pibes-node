import { IsNotEmpty, IsUUID } from "class-validator";

export class CreateFavoriteComboDto {
  @IsUUID()
  @IsNotEmpty()
  comboId: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;
}

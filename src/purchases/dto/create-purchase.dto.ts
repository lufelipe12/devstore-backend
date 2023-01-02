import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePurchaseDto {
  @IsNumber()
  @IsNotEmpty()
  total: number;

  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

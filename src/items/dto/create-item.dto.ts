import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { ProductProvider } from '../../utils';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(ProductProvider)
  @IsNotEmpty()
  provider: ProductProvider;

  @IsBoolean()
  @IsNotEmpty()
  hasDiscount: boolean;

  @IsNumber()
  cartId: number;

  @IsNumber()
  purchaseId: number;
}

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

  @IsString()
  @IsNotEmpty()
  @Length(5, 300)
  img: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsEnum(ProductProvider)
  @IsNotEmpty()
  provider: ProductProvider;

  @IsBoolean()
  @IsNotEmpty()
  hasDiscount: boolean;
}

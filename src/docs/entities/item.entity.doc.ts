import { ApiProperty } from '@nestjs/swagger';
import { ProductProvider } from '../../utils';

export class ItemEntityDoc {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Number,
    example: 10.0,
  })
  price: number;

  @ApiProperty({
    type: Enumerator,
    example: ProductProvider.Brazil,
  })
  provider: ProductProvider;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  hasDiscount: boolean;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  cartId: number;
}

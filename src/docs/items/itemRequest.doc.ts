import { ApiProperty } from '@nestjs/swagger';
import { ProductProvider } from 'src/utils';

export class ItemRequestDoc {
  @ApiProperty({
    type: 'string',
    example: 'Sword',
    description: 'item name',
  })
  name: string;

  @ApiProperty({
    type: 'number',
    example: 1000,
    description: 'item price',
  })
  price: string;

  @ApiProperty({
    type: 'enum',
    example: ProductProvider.Brazil,
    description: 'items provider',
  })
  provider: ProductProvider;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'if item is on sale or not',
  })
  hasDiscount: boolean;
}

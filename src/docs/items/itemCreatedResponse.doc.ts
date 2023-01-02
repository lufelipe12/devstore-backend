import { ApiProperty } from '@nestjs/swagger';
import { ProductProvider } from '../../utils';

export class ItemCreatedResponseDoc {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'User id',
  })
  id: number;

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
    description: 'item provider',
  })
  provider: ProductProvider;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'if item is on sale or not',
  })
  hasDiscount: boolean;

  @ApiProperty({
    type: 'number',
    example: null,
    description: 'purchase id',
  })
  purchaseId: number;
}

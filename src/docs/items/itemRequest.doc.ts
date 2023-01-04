import { ApiProperty } from '@nestjs/swagger';
import { ProductProvider } from '../../utils';

export class ItemRequestDoc {
  @ApiProperty({
    type: 'string',
    example: 'Sword',
    description: 'item name',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example:
      'https://static.wikia.nocookie.net/new-world2651/images/6/6b/Obelisk_Guard_Longsword_Infobox.png/revision/latest?cb=20210911112925',
    description: 'item image',
  })
  img: string;

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

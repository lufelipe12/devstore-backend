import { ApiProperty } from '@nestjs/swagger';

export class ProductDoc {
  @ApiProperty({
    type: 'string',
    example: 'Lorem Ipsum',
    description: 'Products name',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    description: 'Products image',
  })
  image: string;

  @ApiProperty({
    type: 'string',
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
    description: 'Products description',
  })
  description: string;

  @ApiProperty({
    type: 'number',
    example: 100,
    description: 'Products price',
  })
  price: number;

  @ApiProperty({
    type: 'boolean',
    example: false,
    description: 'If product is on sale',
  })
  hasDiscount: boolean;

  @ApiProperty({
    type: 'number',
    example: 0.05,
    description: 'Products discount',
  })
  discountValue: number;
}

import { ApiProperty } from '@nestjs/swagger';

export class CartEntityDoc {
  @ApiProperty({
    type: Number,
    example: 12,
  })
  id: number;

  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'Cart createdAt',
  })
  createdAt: Date;
}

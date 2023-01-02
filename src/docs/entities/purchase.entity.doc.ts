import { ApiProperty } from '@nestjs/swagger';

export class PurchaseEntityDoc {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: Number,
    example: 10.0,
  })
  total: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  userId: number;

  @ApiProperty({
    example: '2020-01-01T00:00:00.000Z',
    description: 'Purchase createdAt',
  })
  createdAt: Date;
}

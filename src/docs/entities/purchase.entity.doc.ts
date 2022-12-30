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
}

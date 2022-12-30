import { ApiProperty } from '@nestjs/swagger';

export class CartEntityDoc {
  @ApiProperty({
    type: Number,
    example: 12,
  })
  id: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  userId: number;
}

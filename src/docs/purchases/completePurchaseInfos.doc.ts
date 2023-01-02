import { ApiProperty } from '@nestjs/swagger';
import { ItemEntityDoc, UserEntityDoc } from '../entities';

export class CompletePurchaseInfos {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Purchase id',
  })
  id: number;

  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'Purchase total price',
  })
  total: number;

  @ApiProperty({
    isArray: true,
    description: 'Items in this purchase.',
  })
  items: ItemEntityDoc;

  @ApiProperty({
    description: 'User who purchase.',
  })
  user: UserEntityDoc;
}

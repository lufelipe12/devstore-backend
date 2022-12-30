import { ApiProperty } from '@nestjs/swagger';

import { ProductDoc } from './product.doc';

export class FindAllPaginatedDoc {
  @ApiProperty({
    type: 'number',
    example: 100,
    description: 'Total of products found',
  })
  count: number;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Current page',
  })
  page: number;

  @ApiProperty({
    type: 'number',
    example: 10,
    description: 'Total pages',
  })
  totalPages: number;

  @ApiProperty({
    type: ProductDoc,
    isArray: true,
    description: 'products found',
  })
  products: ProductDoc[];
}

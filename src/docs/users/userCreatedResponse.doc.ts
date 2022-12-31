import { ApiProperty } from '@nestjs/swagger';

export class UserCreatedResponseDoc {
  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'User id',
  })
  id: number;

  @ApiProperty({
    type: 'string',
    example: 'James',
    description: 'user name',
  })
  name: string;

  @ApiProperty({
    type: 'string',
    example: 'example@mail.com',
    description: 'user email',
  })
  email: string;
}

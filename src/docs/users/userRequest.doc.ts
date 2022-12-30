import { ApiProperty } from '@nestjs/swagger';

export class UserRequestDoc {
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

  @ApiProperty({
    type: 'string',
    description: 'users password',
  })
  password: boolean;
}

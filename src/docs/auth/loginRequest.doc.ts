import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDoc {
  @ApiProperty({
    type: 'string',
    example: 'example@mail.com',
    description: 'user email',
  })
  email: string;

  @ApiProperty({
    type: 'string',
    example: '12345',
    description: 'users password',
  })
  password: string;
}

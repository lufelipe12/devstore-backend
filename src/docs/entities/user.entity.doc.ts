import { ApiProperty } from '@nestjs/swagger';

export class UserEntityDoc {
  @ApiProperty({
    type: Number,
    example: 12,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'Example Name',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'example@mail.com',
  })
  email: string;

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  isAdmin: boolean;
}

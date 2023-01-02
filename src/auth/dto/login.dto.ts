import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @Length(5, 50)
  @IsNotEmpty()
  email: string;

  @IsString()
  @Length(5, 200)
  @IsNotEmpty()
  password: string;
}

import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @Length(5, 50)
  name: string;

  @IsEmail()
  @Length(5, 50)
  @IsNotEmpty()
  email: string;

  @IsOptional()
  isAdmin: boolean;

  @IsString()
  @Length(5, 200)
  @IsNotEmpty()
  password: string;
}

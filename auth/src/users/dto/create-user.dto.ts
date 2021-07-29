import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsEmail(
    {},
    {
      message: 'Invalid email',
    },
  )
  email: string;

  @IsNotEmpty()
  @Length(2, 10, {
    message: 'Password must be 2-10 characters',
  })
  password: string;
}

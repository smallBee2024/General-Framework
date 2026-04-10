import { IsString, IsNotEmpty, MinLength, Matches } from 'class-validator';


export class LoginDto {
  @IsString()
  @MinLength(4)
  name: string

  @IsString()
  @Matches(/^\S*(?=\S{6})(?=\S*\d)(?=\S*[A-Z])\S*$/i)
  @MinLength(6)
  password: string
}
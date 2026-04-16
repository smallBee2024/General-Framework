import { IsString, IsNotEmpty, IsOptional, Matches, MinLength, MaxLength, Length } from 'class-validator';

export class CreateUserDto {
  // 字符串，并且不能为空字符串
  @IsString({ message: '名称必须是字符串' })
  @Matches(/^[^\s]+$/)
  @MinLength(4)
  @MaxLength(20)
  // @Length(4, 20, { message: '名称长度必须在4到20个字符之间' })
  name: string;

  @IsString({ message: '密码必须是字符串' })
  @IsNotEmpty({ message: '密码不能为空' })
  @Matches(/^[a-zA-Z0-9]{8,16}$/, { message: '密码只能包含字母和数字，长度为8-16' })
  password: string;

  @IsString()
  @IsOptional() // 可选
  email: string;

  @IsString()
  @IsOptional() // 可选
  phone: string;
}

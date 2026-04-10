import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth.dto';


@Controller('auth')
@UseGuards(LocalGuard) // 使用本地策略
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  // 注册
  @Post()
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // 登录
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}

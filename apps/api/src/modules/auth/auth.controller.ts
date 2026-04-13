import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';

import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth.dto';


@Controller('auth')
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
  @UseGuards(LocalGuard) // 使用本地策略
  login(@Req() req: any) {
    console.log('登录成功', req.user);
    return this.authService.login(req.user);
  }
}

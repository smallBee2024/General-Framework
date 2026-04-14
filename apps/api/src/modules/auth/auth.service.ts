import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { isEmpty } from 'lodash';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: {
    name: string;
    password: string;
  }) {
    const { name, password } = loginDto;
    const user = await this.usersService.findUserByUserName(name);
    if (isEmpty(user)) {
      throw new HttpException('用户不存在', HttpStatus.NOT_FOUND);
    }

    const { password: userPassword } = user;
    if (userPassword !== password) {
      throw new HttpException('密码错误', HttpStatus.BAD_REQUEST);
    }

    // 生成 JWT 签名
    const jwtSign = await this.jwtService.signAsync({
      id: user.id,
      name: user.name,
      pv: 1, // 版本号
    })
    return {
      access_token: jwtSign
    };
  }
}

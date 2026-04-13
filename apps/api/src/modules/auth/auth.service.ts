import { Injectable } from '@nestjs/common';
// import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';
import { isEmpty } from 'lodash';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}


  async validateUser(name: string, password: string) {
    const user = await this.usersService.findUserByUserName(name);
    if (isEmpty(user)) {
      return null;
    }

    const { password: userPassword } = user;
    if (userPassword !== password) {
      return null;
    }
    if (user) {
      return user;
    }
    return null;
  }

  // async register(createUserDto: any) {
  //   return this.usersService.findAll();
  // }

  async login(loginDto: {
    name: string;
    password: string;
  }) {
    const { name, password } = loginDto;
    const user = await this.usersService.findUserByUserName(name);
    if (isEmpty(user)) {
      return null;
    }

    const { password: userPassword } = user;
    if (userPassword !== password) {
      return null;
    }

    if (user) {
      return user;
    }
    return null;
  }
}

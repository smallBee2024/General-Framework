import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'name',
      passwordField: 'password',
    });
  }

  validate(name: string, password: string): Promise<any> {
    console.log('strategy validate', name, password);
    return this.authService.validateUser(name, password);
  }
}
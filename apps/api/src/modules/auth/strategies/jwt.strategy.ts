import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthStrategy } from '../auth.constant';
import { securityRegToken, ISecurityConfig } from '~/config';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.JWT) {
  constructor(
    private readonly configService: ConfigService,
  ) {
    const securityConfig = configService.get<ISecurityConfig>(securityRegToken)
    console.log('securityConfig', securityConfig)
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: securityConfig.jwtSecret,
    });
  }

  validate(payload: any) {
    console.log('payload', payload);
    return payload;
  }
}
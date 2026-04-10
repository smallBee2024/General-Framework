import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { securityRegToken, ISecurityConfig } from '~/config';
import { isDev } from '~/global/env';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const { jwtSecret, jwtExprire } = configService.get<ISecurityConfig>(securityRegToken)
        return {
          secret: jwtSecret,
          signOptions: { expiresIn: jwtExprire },
          ignoreExpiration: isDev, // 开发环境忽略过期时间
        }
      },
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy, // 本地策略: 登录验证
  ],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { securityRegToken, ISecurityConfig } from '~/config';
import { isDev } from '~/global/env';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    PassportModule, // 引入 PassportModule 模块
    // 引入 JwtModule 模块，及配置 JwtModule 模块
    JwtModule.registerAsync({
      imports: [ConfigModule], // 引入 ConfigModule 模块
      useFactory: (configService: ConfigService) => {
        const { jwtSecret, jwtExprire } = configService.get<ISecurityConfig>(securityRegToken)
        return {
          secret: jwtSecret, // 设置密钥
          signOptions: { expiresIn: jwtExprire }, // 设置过期时间
          ignoreExpiration: isDev, // 开发环境忽略过期时间
        }
      },
      inject: [ConfigService], // 注入 ConfigService 服务
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
  ],
})
export class AuthModule {}

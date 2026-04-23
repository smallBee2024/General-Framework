import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { DatabaseModule } from './shared/database/database.module';
import config from '~/config';
// import { AppController } from './app.controller';
import { AuthModule } from './modules/auth/auth.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { JwtGuard } from './modules/auth/guards/jwt.guard';
import { RoleModule } from './modules/system/role/role.module';
import { MenuModule } from './modules/system/menu/menu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      // 全局配置
      isGlobal: true,
      // 展开环境变量，将环境变量转换为对象；eg: DB_HOST=localhost -> { DB_HOST: 'localhost' }
      expandVariables: true,
      // 环境变量文件
      envFilePath: ['.env.local', `.env.${process.env.NODE_ENV}`, '.env'],
      // 加载配置
      load: [...Object.values(config)],
    }),
    DatabaseModule,
    // UsersModule,
    AuthModule,
    // system modules
    RoleModule,
    MenuModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    // 全局注册 jwt 守卫
    { provide: APP_GUARD, useClass: JwtGuard },
  ],
})
export class AppModule {}

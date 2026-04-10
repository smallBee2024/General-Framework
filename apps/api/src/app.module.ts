import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from './shared/database/database.module';
import config from '~/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';

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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

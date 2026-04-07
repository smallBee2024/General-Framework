import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpException, HttpStatus, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true, // 允许隐式类型转换
      },
      // 对单个属性的多条校验规则，命中第一条失败就停止继续校验（减少错误数量、响应更短）。
      stopAtFirstError: true,
      // 详细的错误响应
      exceptionFactory: (errors) => {
        const messages = errors.map((e) => {
          const rule = Object.keys(e.constraints!)[0]
          const msg = e.constraints![rule]
          return msg
        })
        return new HttpException(
          {
            statusCode: HttpStatus.BAD_REQUEST,
            message: messages[0] || 'Validation failed'
          },
          HttpStatus.BAD_REQUEST
        )
      },
    }),
  );
  await app.listen(3000);
}
bootstrap();

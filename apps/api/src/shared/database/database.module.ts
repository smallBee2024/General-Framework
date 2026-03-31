import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { dbRegToken, IDatabaseConfig } from '~/config/database.config';
// import { DataSourceOptions } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dataSourceOptions = configService.get<IDatabaseConfig>(dbRegToken)
        return {
					...dataSourceOptions
        }
      },
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
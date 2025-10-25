import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import appConfig from './app.config';
import databaseConfig from './database.config';
import * as path from 'path';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(process.cwd(), '.env'),
      load: [appConfig, databaseConfig],
      cache: true,
    }),
  ],
})
export class ConfigModule {}


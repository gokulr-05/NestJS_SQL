import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from "./typeorm/entities/user.entity"
import { Profile } from "./typeorm/entities/profile.entity"
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { ApiTokenCheckMiddleware } from './common/middleware/api-token-check.middleware';
import { dataSourceOptions } from './data-source';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: path.join(process.cwd(), '.env'),
      // cache: true,
    }),
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiTokenCheckMiddleware)
      // options:
      // .forRoutes('*');                       // apply globally
      .forRoutes({ path: 'users/admin' , method: RequestMethod.GET }); // apply to /users
  }
}

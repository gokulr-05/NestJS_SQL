import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./typeorm/entities/user.entity"
import { Profile } from "./typeorm/entities/profile.entity"
import { UsersModule } from './users/users.module';

@Module({
  imports: [ TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'nestjs_mysql',
      entities: [User, Profile],
      synchronize: true,
    }), UsersModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

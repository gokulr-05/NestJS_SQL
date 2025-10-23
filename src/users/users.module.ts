import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from '../typeorm/entities/user.entity';
import { Profile } from '../typeorm/entities/profile.entity';
import {UsersController} from './users.controller'

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile]),
  ],
  controllers:[UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}

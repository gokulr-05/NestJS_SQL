import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDetails: CreateUserDto): Promise<User> {
    const user = this.userRepository.create({
      ...userDetails,
      createdAt: new Date(),
    });

    return await this.userRepository.save(user);

  }

  async findAll(): Promise<User[]> {
    const rows = await this.userRepository.find();
    return rows;
  }
}

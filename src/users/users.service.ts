import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(userDetails: UserDto): Promise<User> {
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


  async updateUser(id: number, userDetails: UserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where:{id} });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    Object.assign(user, userDetails);

    return await this.userRepository.save(user);
  }

  async deleteUser(id: number): Promise<{ message: string }> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    await this.userRepository.remove(user);

    return { message: `User with id ${id} has been deleted successfully` };
  }
}

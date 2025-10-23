import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../typeorm/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/user.dto';
import { Profile } from '../typeorm/entities/profile.entity';
import { ProfileDto } from './dto/profile.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async create(userDetails: UserDto): Promise<User> {
    // Save profile first
    const profile = await this.profileRepository.save({
      firstName: userDetails.firstName,
      lastName: userDetails.lastName,
      email: userDetails.email,
    });

    // Then save user with profile reference
    const user = this.userRepository.create({
      // username: userDetails.username,
      // password: userDetails.password,
      // authStrategy: userDetails.authStrategy,
      ...userDetails,
      profile,
    });

    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    const rows = await this.userRepository.find({relations:['profile']});
    return rows;
  }

  async updateUser(id: number, userDetails: UserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });

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

  async updateProfile(id: number, profileDetails: ProfileDto): Promise<Profile> {
    const user= await this.userRepository.findOne({where:{id}, relations:['profile']});

    if(!user)
    {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    const profile = user.profile;

    Object.assign(profile, profileDetails);

    return await this.profileRepository.save(profile);

  }

}

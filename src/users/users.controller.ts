import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from '../typeorm/entities/user.entity';
import { ProfileDto } from './dto/profile.dto';
import { RolesGuard } from '../common/guards/roles.guard';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: UserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(){
    return this.usersService.findAll();
  }

  @Patch(':id')
  async updateUser(@Param('id', ParseIntPipe) id:number,@Body() userDetails:UserDto){
    return this.usersService.updateUser(id,userDetails);
  }

  @Delete(':id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.deleteUser(id);
  }

  @Patch(':id/profile')
  async updateProfile(@Param('id', ParseIntPipe) id:number,@Body() profileDetails:ProfileDto){
    return this.usersService.updateProfile(id,profileDetails);
  }

  // Apply RolesGuard - controller no longer checks role, guard enforces it
  @UseGuards(RolesGuard)
  @Get('admin')
  admin() {
    return { message: 'Hello Admin' };
  }

}

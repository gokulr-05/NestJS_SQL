import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './dto/user.dto';
import { User } from '../typeorm/entities/user.entity';


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

}

/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import { UsersService } from './users.service';
import User from './user.entity';
import ResponseUserDto from './dto/response-user.dto';

@Controller('users')
export class UsersController {

    public constructor(
        private userService: UsersService
    ) {}

    @Get()
    public getUsers():Promise<User[]> {
        return this.userService.getUsers()
    }

    @Post()
    public createUser(@Body() body: CreateUserDto):Promise<ResponseUserDto> {
        const user = this.userService.createUser(body);
        return user
    }

    @Get(':id')
    public getUserById(@Param('id') id: number):Promise<ResponseUserDto> {
        const user = this.userService.getUserById(id);
        return user
    }

    @Delete(':id')
    public deleteUser(@Param('id') id: number):Promise<ResponseUserDto> {
        const user = this.userService.deleteUser(id);
        return user
    }

    @Put(':id')
    public updateUser(@Param('id') id: number, @Body() body: CreateUserDto):Promise<ResponseUserDto> {
        const user = this.userService.updateUser(id, body);
        return user
    }
}

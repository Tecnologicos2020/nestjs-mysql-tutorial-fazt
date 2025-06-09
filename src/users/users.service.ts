/* eslint-disable prettier/prettier */
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import CreateUserDto from './dto/create-user.dto';
import ResponseUserDto from './dto/response-user.dto';

@Injectable()
export class UsersService {

    public constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ) {}

    public async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }
    
    public async createUser(user: CreateUserDto): Promise<ResponseUserDto> {
        // eslint-disable-next-line no-useless-catch
        try {

            const userExists = await this.userRepository.findOneBy({username: user.username})
            if (userExists) {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'User already exists',
                    data: null
                }
            }
            const newUser = this.userRepository.create(user);
            const result = await this.userRepository.save(newUser);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User created successfully',
                data: result
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error creating user',
                data: null
            }
        }
    }

    public async getUserById(id: number): Promise<ResponseUserDto> {
        // eslint-disable-next-line no-useless-catch
        try {   
        const user = await this.userRepository.findOneBy({id});
        if (!user) {
            return {
                statusCode: HttpStatus.NOT_FOUND,
                message: 'User not found',
                data: null
            }
        }
        return {
            statusCode: HttpStatus.OK,
            message: 'User found successfully',
            data: user
        };
        } catch (error) {
            console.log(error);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error getting user',
                data: null
            }
        }
    }

    public async deleteUser(id: number): Promise<ResponseUserDto> {
        // eslint-disable-next-line no-useless-catch
        try {
            const user = await this.userRepository.findOneBy({id});
            if (!user) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null
                }
            }
            await this.userRepository.remove(user);
            return {
                statusCode: HttpStatus.OK,
                message: 'User deleted successfully',
                data: user
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error deleting user',
                data: null
            }
        }
    }

    public async updateUser(id: number, user: CreateUserDto): Promise<ResponseUserDto> {
        // eslint-disable-next-line no-useless-catch
        try {
            const userExists = await this.userRepository.findOneBy({id});
            if (!userExists) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null
                }
            }
            const updatedUser = await this.userRepository.update(id, user);
            if (updatedUser.affected===0) {
                return {
                    statusCode: HttpStatus.NOT_FOUND,
                    message: 'User not found',
                    data: null
                }
            }
            return {
                statusCode: HttpStatus.OK,
                message: 'User updated successfully',
                data: userExists
            }
        } catch (error) {
            console.log(error);
            return {
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Error updating user',
                data: null
            }
        }
    }
}

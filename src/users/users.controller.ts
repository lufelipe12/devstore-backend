import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserCreatedResponseDoc, UserRequestDoc } from '../docs';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators';
import { User } from '../database/entities/user.entity';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user.',
    description: 'Create a new user.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserCreatedResponseDoc,
  })
  @ApiBody({
    type: UserRequestDoc,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Find all users (ADMIN).',
    description: 'Find all users (ADMIN).',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: UserCreatedResponseDoc,
  })
  async findAll(@CurrentUser() currentUser: User) {
    await this.usersService.isAdmin(currentUser.id);
    return await this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Find users profile.',
    description: 'Find users logged profile.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserCreatedResponseDoc,
  })
  async profile(@CurrentUser() currentUser: User) {
    return await this.usersService.findOne(+currentUser.id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Find an user by id (ADMIN).',
    description: 'Find an user by id (ADMIN).',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserCreatedResponseDoc,
  })
  async findOne(@Param('id') id: string, @CurrentUser() currentUser: User) {
    await this.usersService.isAdmin(currentUser.id);
    return await this.usersService.findOne(+id);
  }
}

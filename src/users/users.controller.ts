import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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
import { UpdateUserDto } from './dto/update-user.dto';
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
    summary: 'Create new user.',
    description: 'Create new user.',
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
    summary: 'Find all users.',
    description: 'Find all users.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: UserCreatedResponseDoc,
  })
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Find an users profile.',
    description: 'Find an users profile.',
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
    summary: 'Find an user by id.',
    description: 'Find an user by id.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: UserCreatedResponseDoc,
  })
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}

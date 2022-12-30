import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { User } from '../database/entities/user.entity';
import { Repository } from 'typeorm';

import { CartsService } from '../carts/carts.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private cartsService: CartsService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    try {
      const emailExists = await this.findByEmail(createUserDto.email);

      if (emailExists) {
        throw new ConflictException('An user with this email already exists.');
      }

      const newUser = this.usersRepository.create(createUserDto);
      await this.usersRepository.save(newUser);

      await this.cartsService.create({ userId: newUser.id });

      return await this.findOne(newUser.id);
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByEmail(email: string) {
    try {
      const user = await this.usersRepository.findOne({ where: { email } });

      return user;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['purchases', 'purchases.items'],
      });

      return user;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

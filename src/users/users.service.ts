import {
  ConflictException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
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

      const { id } = await this.cartsService.create();

      const newUser = this.usersRepository.create({
        ...createUserDto,
        cart: { id },
      });
      await this.usersRepository.save(newUser);

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

  async findAll() {
    try {
      const users = await this.usersRepository.find({
        relations: ['cart', 'cart.items', 'purchases', 'purchases.items'],
      });

      return users;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id },
        relations: ['cart', 'cart.items', 'purchases', 'purchases.items'],
      });

      if (!user) {
        throw new NotFoundException('User not found.');
      }

      return user;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getUsersCart(userId: number) {
    try {
      const user = await this.findOne(userId);
      const cart = await this.cartsService.findOne(user.cart.id);

      return cart;
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

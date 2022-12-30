import { CreateCartDto } from './dto/create-cart.dto';

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from 'src/database/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    @InjectRepository(Cart)
    private readonly cartsRepository: Repository<Cart>,
  ) {}
  async create(createCartDto: CreateCartDto) {
    try {
      const { userId } = createCartDto;

      const newCart = this.cartsRepository.create({
        user: { id: userId },
      });

      await this.cartsRepository.save(newCart);

      return newCart;
    } catch (error) {
      this.logger.error(error);

      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

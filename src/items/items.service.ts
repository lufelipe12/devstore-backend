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
import { Repository } from 'typeorm';

import { Item } from '../database/entities/item.entity';
import { CartsService } from '../carts/carts.service';
import { CreateItemDto } from './dto/create-item.dto';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    private readonly cartsService: CartsService,
  ) {}

  async create(createItemDto: CreateItemDto) {
    try {
      const { cartId } = createItemDto;
      await this.cartsService.findOne(cartId);

      const newItem = this.itemsRepository.create({
        ...createItemDto,
        cart: { id: cartId },
      });
      await this.itemsRepository.save(newItem);

      return await this.findOne(newItem.id);
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return `This action returns all items`;
  }

  async findOne(id: number) {
    try {
      const item = await this.itemsRepository.findOne({
        where: { id },
      });

      if (!item) {
        throw new NotFoundException('Item not found.');
      }

      return item;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeFromCart(id: number) {
    try {
      const item = await this.findOne(id);
      await this.itemsRepository.remove(item);

      if (item.purchase) {
        throw new ConflictException('You cant delete this item.');
      }

      return item;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

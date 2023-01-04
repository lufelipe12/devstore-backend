import {
  BadRequestException,
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
import { CreateItemDto } from './dto/create-item.dto';
import { User } from '../database/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class ItemsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>,

    private readonly usersService: UsersService,
  ) {}

  async create(createItemDto: CreateItemDto, currentUser: User) {
    try {
      const { cart } = await this.usersService.findOne(currentUser.id);

      const newItem = this.itemsRepository.create({
        ...createItemDto,
        cart: { id: cart.id },
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

  async findOne(id: number) {
    try {
      const item = await this.itemsRepository.findOne({
        where: { id },
        relations: ['purchase'],
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

  async removeFromCart(id: number, currentUser: User) {
    try {
      const { cart } = await this.usersService.findOne(currentUser.id);
      const itemInCart = cart.items.find((item) => item.id === id);

      if (!itemInCart) {
        throw new NotFoundException('This item is not in your cart.');
      }

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

  async purchaseItems(cartId: number, purchaseId: number) {
    try {
      const items = await this.itemsRepository.find({
        where: { cart: { id: cartId } },
        relations: ['cart', 'purchase'],
      });

      if (!items.length) {
        throw new BadRequestException('You dont have items on cart.');
      }

      const itemsPurchased = items.map((item) => {
        const newItem = {
          ...item,
          cart: { id: null },
          purchase: { id: purchaseId },
        };

        return this.itemsRepository.create(newItem);
      });

      await this.itemsRepository.save(itemsPurchased);

      return itemsPurchased;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

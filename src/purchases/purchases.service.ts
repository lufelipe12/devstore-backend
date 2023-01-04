import {
  BadRequestException,
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

import { UsersService } from '../users/users.service';
import { CartsService } from '../carts/carts.service';
import { ItemsService } from '../items/items.service';
import { Purchase } from '../database/entities/purchase.entity';
import { User } from '../database/entities/user.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,

    private readonly usersService: UsersService,
    private readonly cartsService: CartsService,
    private readonly itemsService: ItemsService,
  ) {}

  async create(currentUser: User) {
    try {
      const { id } = currentUser;

      const usersCart = await this.usersService.getUsersCart(id);

      if (usersCart.items.length == 0) {
        throw new BadRequestException('You dont have items in cart.');
      }

      const total = usersCart.items.reduce(
        (prev, curr) => +prev + +curr.price,
        0,
      );

      const newPurchase = this.purchasesRepository.create({
        total,
        user: { id },
      });

      await this.purchasesRepository.save(newPurchase);
      await this.purchaseItems(usersCart.id, newPurchase.id);

      return await this.findOne(newPurchase.id);
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
      const itemsPurchased = await this.itemsService.purchaseItems(
        cartId,
        purchaseId,
      );

      return itemsPurchased;
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
      const purchases = await this.purchasesRepository.find({
        relations: ['items', 'user'],
      });

      return purchases;
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
      const purchase = await this.purchasesRepository.findOne({
        where: { id },
        relations: ['items'],
      });

      if (!purchase) {
        throw new NotFoundException('Purchase not found.');
      }

      return purchase;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async verifyAdmin(userId: number) {
    try {
      await this.usersService.isAdmin(userId);
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

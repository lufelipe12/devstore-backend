import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from '../database/entities/user.entity';
import { CartsModule } from '../carts/carts.module';
import { CartsService } from '../carts/carts.service';
import { Cart } from '../database/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Cart]), CartsModule],
  controllers: [UsersController],
  providers: [UsersService, CartsService],
})
export class UsersModule {}

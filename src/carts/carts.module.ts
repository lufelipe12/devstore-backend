import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Cart } from '../database/entities/cart.entity';
import { CartsService } from './carts.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cart])],
  providers: [CartsService],
})
export class CartsModule {}

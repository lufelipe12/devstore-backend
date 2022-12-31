import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from '../database/entities/cart.entity';
import { Item } from '../database/entities/item.entity';
import { CartsModule } from '../carts/carts.module';

@Module({
  imports: [TypeOrmModule.forFeature([Item]), CartsModule],
  controllers: [ItemsController],
  providers: [ItemsService],
  exports: [ItemsService],
})
export class ItemsModule {}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ProductProvider } from '../../utils';
import { Cart } from './cart.entity';
import { Purchase } from './purchase.entity';

@Entity('items')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 300,
  })
  img: string;

  @Column({
    type: 'decimal',
  })
  price: number;

  @Column({
    type: 'enum',
    enum: ProductProvider,
  })
  provider: ProductProvider;

  @Column()
  hasDiscount: boolean;

  @ManyToOne(() => Cart, (cart) => cart.items, { nullable: true })
  cart: Cart;

  @ManyToOne(() => Purchase, (purchase) => purchase.items, { nullable: true })
  purchase: Purchase;
}

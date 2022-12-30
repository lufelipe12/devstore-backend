import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';

import { User } from './user.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;

  @OneToMany(() => Item, (item) => item.cart)
  items: Item[];
}

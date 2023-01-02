import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './item.entity';
import { User } from './user.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
  })
  total: number;

  @OneToMany(() => Item, (item) => item.purchase)
  items: Item[];

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}

import { InternalServerErrorException } from '@nestjs/common';
import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Purchase } from './purchase.entity';
import { Cart } from './cart.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Index()
  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    default: false,
    select: false,
  })
  isAdmin: boolean;

  @Column({
    select: false,
    length: 200,
  })
  password: string;

  @OneToOne(() => Cart)
  @JoinColumn()
  cart: Cart;

  @OneToMany(() => Purchase, (purchase) => purchase.user)
  purchases: Purchase[];

  @BeforeInsert()
  public async setPassword(password: string): Promise<void> {
    try {
      if (this.password || password) {
        this.password = await bcrypt.hash(password || this.password, 10);
      }
    } catch (error) {
      throw new InternalServerErrorException(
        'there are some issues in the hash',
      );
    }
  }
}

import { InternalServerErrorException } from '@nestjs/common';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Purchase } from './purchase.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    length: 50,
    unique: true,
  })
  email: string;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({
    length: 50,
    select: false,
  })
  password: string;

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

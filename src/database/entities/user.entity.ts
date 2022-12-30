import { InternalServerErrorException } from '@nestjs/common';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import * as bcrypt from 'bcryptjs';

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

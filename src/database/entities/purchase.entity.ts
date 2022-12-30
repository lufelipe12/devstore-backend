import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('purchases')
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
  })
  total: number;

  @ManyToOne(() => User, (user) => user.purchases)
  user: User;
}

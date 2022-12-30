import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  TypeOrmModuleAsyncOptions,
  TypeOrmModuleOptions,
} from '@nestjs/typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Cart } from './entities/cart.entity';
import { Purchase } from './entities/purchase.entity';
import { User } from './entities/user.entity';

export default <TypeOrmModuleAsyncOptions>{
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => {
    return <PostgresConnectionOptions>{
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: +configService.get('DB_PORT'),
      username: configService.get('DB_USER'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_NAME'),
      entities: [User, Purchase, Cart],
      synchronize: true,
      logging: false,
      ssl:
        configService.get('APP_ENV') === 'prod'
          ? { rejectUnauthorized: false }
          : false,
    };
  },
};

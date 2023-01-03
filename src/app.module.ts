import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { DatabaseModule } from './database/database.module';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { winstonAsyncConfigOptions } from './logger/winston.config';
import { ProductsModule } from './products/products.module';
import { CartsModule } from './carts/carts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { PurchasesModule } from './purchases/purchases.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    WinstonModule.forRootAsync(winstonAsyncConfigOptions),
    DatabaseModule,
    ProductsModule,
    CartsModule,
    UsersModule,
    AuthModule,
    ItemsModule,
    PurchasesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { WinstonModule } from 'nest-winston';

import { DatabaseModule } from './database/database.module';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { winstonAsyncConfigOptions } from './logger/winston.config';

@Module({
  imports: [
    WinstonModule.forRootAsync(winstonAsyncConfigOptions),
    DatabaseModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {}

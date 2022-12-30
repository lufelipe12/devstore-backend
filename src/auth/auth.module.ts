import * as cookieParser from 'cookie-parser';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from '../database/entities/user.entity';
import { AuthService } from './auth.service';
import { JwtStrategy, LocalStrategy } from './strategies';
import { UsersModule } from '../users/users.module';
import { JWTModule } from '../jwt/jwt.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
    JWTModule,
  ],
  controllers: [AuthController],
  providers: [AuthModule, AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(cookieParser()).forRoutes('*');
  }
}

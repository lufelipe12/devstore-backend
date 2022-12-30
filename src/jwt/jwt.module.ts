import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { jwtOptions } from './jwt.config';
import { JWTService } from './jwt.service';

@Module({
  imports: [JwtModule.registerAsync(jwtOptions)],
  providers: [JWTService],
  exports: [JWTService],
})
export class JWTModule {}

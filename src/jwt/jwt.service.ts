import { Request } from 'express';
import { DecodeOptions } from 'jsonwebtoken';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

import { AuthTokenPayload } from '../auth/interfaces';
import { CookieHttpConfig } from '../auth/configs';

@Injectable()
export class JWTService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  sign(payload: string | object | Buffer, options?: JwtSignOptions) {
    return this.jwtService.sign(payload, options);
  }

  async signAsync(payload: string | object | Buffer, options?: JwtSignOptions) {
    return this.jwtService.signAsync(payload, options);
  }

  verify(token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verify(token, options);
  }

  async verifyAsync(token: string, options?: JwtVerifyOptions) {
    return this.jwtService.verifyAsync(token, options);
  }

  decode(token: string, options?: DecodeOptions) {
    return this.jwtService.decode(token, options);
  }

  async getToken(
    tokenPayload: AuthTokenPayload,
    expires?: string,
  ): Promise<string> {
    try {
      const token: string = await this.jwtService.signAsync(tokenPayload, {
        expiresIn:
          expires || this.configService.get<number>('JWT_EXPIRATION') * 1000,
      });

      return `Bearer ${token}`;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async getVolatileToken(tokenPayload: any, expires?: string): Promise<string> {
    try {
      const token: string = await this.jwtService.signAsync(tokenPayload, {
        expiresIn:
          expires || this.configService.get<number>('JWT_EXPIRATION') * 0.1,
      });

      return `Bearer ${token}`;
    } catch (error) {
      throw new UnprocessableEntityException(error.message);
    }
  }

  async refreshToken(
    cookieName: string,
    request: Request,
    payload: AuthTokenPayload,
  ): Promise<void> {
    const token: string = await this.getToken(payload);

    request.res.cookie(cookieName, token, CookieHttpConfig.Options());
  }
}

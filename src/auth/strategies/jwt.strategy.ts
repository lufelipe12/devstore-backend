import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';

import { JWTService } from '../../jwt/jwt.service';
import { AuthTokenPayload } from '../interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JWTService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          try {
            const token = request.cookies['Authorization']?.split(' ')[1];

            if (token) {
              return token;
            }

            return null;
          } catch (e) {
            return null;
          }
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(request: Request, payload: any): Promise<AuthTokenPayload> {
    const tokenPayload: AuthTokenPayload = {
      email: payload.email,
      id: payload.id,
      name: payload.name,
    };

    await this.jwtService.refreshToken('Authorization', request, tokenPayload);

    return tokenPayload;
  }
}

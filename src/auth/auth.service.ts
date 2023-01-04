import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';

import { User } from '../database/entities/user.entity';
import { AuthTokenPayload } from './interfaces';
import { JWTService } from '../jwt/jwt.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    private readonly configService: ConfigService,
    private readonly jwtService: JWTService,
    private readonly usersService: UsersService,
  ) {}

  async login(payload: AuthTokenPayload): Promise<any> {
    const currentUser: User = await this.usersService.findOne(payload.id);

    const newPayload = {
      id: currentUser.id,
      name: currentUser.name,
      email: currentUser.email,
    };

    const token: string = await this.getToken(newPayload);

    return { token, user: currentUser };
  }

  async getToken(
    tokenPayload: AuthTokenPayload,
    expires?: string,
  ): Promise<string> {
    try {
      const token: string = await this.jwtService.signAsync(tokenPayload, {
        expiresIn:
          expires || this.configService.get<number>('JWT_EXPIRATION') * 1000,
        secret: this.configService.get<string>('JWT_SECRET'),
      });
      return `Bearer ${token}`;
    } catch (error) {
      this.logger.error(error);

      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user: User = await this.usersRepository.findOne({
        where: [{ email: email }],
        select: ['id', 'name', 'email', 'password'],
      });

      if (!user) {
        throw new UnauthorizedException(`Credentials are not valid.`);
      }

      const passwordIsValid = await bcrypt.compare(
        password,
        user?.password || '',
      );

      if (!passwordIsValid) {
        throw new UnauthorizedException('Credentials are not valid.');
      }

      const { password: _, ...result } = user;

      return result as User;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

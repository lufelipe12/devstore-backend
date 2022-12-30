import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { User } from 'src/database/entities/user.entity';

import { AuthService } from './auth.service';
import { CookieHttpConfig } from './configs';
import { CurrentUser } from './decorators';
import { LocalAuthGuard } from './guards';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(
    @CurrentUser() currentUser: User,
    @Res() res: Response,
  ): Promise<void> {
    const { token, user } = await this.authService.login(currentUser);

    res
      .status(HttpStatus.OK)
      .cookie('Authorization', token, CookieHttpConfig.Options())
      .json(user);
  }
}

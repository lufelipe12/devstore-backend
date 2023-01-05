import {
  Controller,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { User } from '../database/entities/user.entity';
import { LoginRequestDoc, UserCreatedResponseDoc } from '../docs';
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
  @ApiOperation({
    summary: 'Login with email and password',
    description: 'Login with email and password',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserCreatedResponseDoc,
  })
  @ApiBody({
    type: LoginRequestDoc,
  })
  async login(
    @CurrentUser() currentUser: User,
    @Res() res: Response,
  ): Promise<void> {
    const { token, user } = await this.authService.login(currentUser);

    res
      .cookie('Authorization', token, CookieHttpConfig.Options())
      .status(HttpStatus.OK)
      .json(user);
  }
}

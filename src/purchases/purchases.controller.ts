import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { PurchasesService } from './purchases.service';
import { CurrentUser } from '../auth/decorators';
import { User } from '../database/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards';
import { PurchaseCreatedDoc } from '../docs';

@ApiTags('purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: 'Register new purchase.',
    description: 'Register new puchase with items in your cart.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: PurchaseCreatedDoc,
  })
  @ApiCookieAuth()
  async create(@CurrentUser() currentUser: User) {
    return await this.purchasesService.create(currentUser);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Gell all purchases (ADMIN).',
    description: 'Gell all purchases (ADMIN).',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
    type: PurchaseCreatedDoc,
  })
  async findAll(@CurrentUser() currentUser: User) {
    await this.purchasesService.verifyAdmin(currentUser.id);
    return await this.purchasesService.findAll();
  }
}

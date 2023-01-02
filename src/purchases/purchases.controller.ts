import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

import { PurchasesService } from './purchases.service';
import { CurrentUser } from '../auth/decorators';
import { User } from '../database/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('purchases')
@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async create(@CurrentUser() currentUser: User) {
    return await this.purchasesService.create(currentUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async findAll(@CurrentUser() currentUser: User) {
    await this.purchasesService.verifyAdmin(currentUser.id);
    return await this.purchasesService.findAll();
  }
}

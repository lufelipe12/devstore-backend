import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

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
  async create(@CurrentUser() currentUser: User) {
    return await this.purchasesService.create(currentUser);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll() {
    return await this.purchasesService.findAll();
  }
}

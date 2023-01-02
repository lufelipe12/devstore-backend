import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBody,
  ApiCookieAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemCreatedResponseDoc, ItemRequestDoc } from '../docs';
import { ItemDeletedResponseDoc } from '../docs';
import { CurrentUser } from '../auth/decorators';
import { User } from '../database/entities/user.entity';
import { JwtAuthGuard } from '../auth/guards';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @ApiCookieAuth()
  @ApiOperation({
    summary: 'Create new item.',
    description:
      'Create new item, based on providers and users cart. A product became an item when its been added to cart.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ItemCreatedResponseDoc,
  })
  @ApiBody({
    type: ItemRequestDoc,
  })
  async create(
    @Body() createItemDto: CreateItemDto,
    @CurrentUser() currentUser: User,
  ) {
    return await this.itemsService.create(createItemDto, currentUser);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Delete an item.',
    description: 'Delete an item, based on id and users cart.',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: ItemDeletedResponseDoc,
  })
  async remove(@Param('id') id: string, @CurrentUser() currentUser: User) {
    return await this.itemsService.removeFromCart(+id, currentUser);
  }
}

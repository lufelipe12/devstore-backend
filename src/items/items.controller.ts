import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemCreatedResponseDoc, ItemRequestDoc } from '../docs';
import { ItemDeletedResponseDoc } from '../docs';

@ApiTags('items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create new item.',
    description: 'Create new item, based on providers.',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ItemCreatedResponseDoc,
  })
  @ApiBody({
    type: ItemRequestDoc,
  })
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemsService.create(createItemDto);
  }

  // @Get()
  // findAll() {
  //   return this.itemsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.itemsService.findOne(+id);
  // }

  @Delete(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({
    summary: 'Delete an item.',
    description: 'Delete an item, based on id.',
  })
  @ApiResponse({
    status: HttpStatus.ACCEPTED,
    type: ItemDeletedResponseDoc,
  })
  async remove(@Param('id') id: string) {
    return await this.itemsService.removeFromCart(+id);
  }
}

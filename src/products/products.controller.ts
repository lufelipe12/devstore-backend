import {
  Controller,
  Get,
  Param,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { VarParsers } from '../utils/parsers';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private varParser: VarParsers,
  ) {}

  @Get()
  async findAllPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('name') name: string,
    @Query('hasDiscount') hasDiscount: string,
  ) {
    return await this.productsService.findAllPaginated(
      page,
      limit,
      name && name.toLowerCase(),
      hasDiscount === null
        ? null
        : this.varParser.parseStringToBoolean(hasDiscount),
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }
}

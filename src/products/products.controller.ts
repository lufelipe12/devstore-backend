import {
  Controller,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { VarParsers } from '../utils';
import { FindAllPaginatedDoc } from '../docs';
import { ProductsService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private varParser: VarParsers,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'View of all products',
    description: 'Find all products in the store.',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindAllPaginatedDoc,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    description: 'Page number',
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    description: 'Limit of results in the response',
    required: false,
    example: 12,
  })
  @ApiQuery({
    name: 'name',
    type: Number,
    description: 'Name of product to be found',
    required: false,
    example: 'Bike',
  })
  @ApiQuery({
    name: 'hasDiscount',
    type: Boolean,
    description: 'Search to look product with discount or not',
    required: false,
    example: true,
  })
  async findAllPaginated(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(12), ParseIntPipe) limit: number,
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
}

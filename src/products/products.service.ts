import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ProductDto } from './dto/product.dto';
import { ProviderOneClient, ProviderTwoClient } from '../utils/resources';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    private clientOne: ProviderOneClient,
    private clientTwo: ProviderTwoClient,
  ) {}

  async findAll(page: number, limit: number) {
    try {
      const products = await this.clientOne.getProducts();

      return products;
    } catch (error) {
      this.logger.error(error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }
}

import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

import { ProviderOneClient, ProviderTwoClient } from '../utils/resources';
import { FindAllPaginatedDto } from './dto/findAllPaginated.dto';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,

    private clientOne: ProviderOneClient,
    private clientTwo: ProviderTwoClient,
  ) {}

  async findAllPaginated(
    page: number,
    limit: number,
    name: string,
    hasDiscount: string,
  ): Promise<FindAllPaginatedDto> {
    try {
      const clientOneProducts = await this.clientOne.getProducts();
      const clientTwoProducts = await this.clientTwo.getProducts();
      let products: ProductDto[] = [...clientOneProducts, ...clientTwoProducts];

      if (name) {
        products = products.filter((product) => product.name.includes(name));
      }

      if (hasDiscount) {
        products = products.filter(
          (product) => product.hasDiscount.toString() === hasDiscount,
        );
      }

      const productsPaginated = products.slice(
        (page - 1) * limit,
        page * limit,
      );

      const totalPages = Math.round(products.length / limit);

      return {
        count: productsPaginated.length,
        page,
        totalPages,
        products: productsPaginated,
      };
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

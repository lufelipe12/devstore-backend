import { Module } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProviderOneClient, ProviderTwoClient } from '../utils/resources';
import { VarParsers } from '../utils/parsers';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    ProviderOneClient,
    ProviderTwoClient,
    VarParsers,
  ],
})
export class ProductsModule {}

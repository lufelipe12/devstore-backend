import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProviderOneClient, ProviderTwoClient } from 'src/utils/resources';

@Module({
  imports: [],
  controllers: [ProductsController],
  providers: [ProductsService, ProviderOneClient, ProviderTwoClient],
})
export class ProductsModule {}

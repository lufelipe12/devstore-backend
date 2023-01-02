import { ProductDto } from './product.dto';

export class FindAllPaginatedDto {
  count: number;
  page: number;
  totalPages: number;
  products: ProductDto[];
}

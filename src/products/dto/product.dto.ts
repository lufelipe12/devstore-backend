import { ProductProvider } from '../../utils';

export class ProductDto {
  name: string;
  image: string;
  description: string;
  price: number;
  hasDiscount: boolean;
  discountValue: number | null;
  provider: ProductProvider;
}

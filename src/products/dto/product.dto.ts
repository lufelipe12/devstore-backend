import { ProductProvider } from '../../utils/enums/product-provider.enum';

export class ProductDto {
  name: string;
  image: string;
  description: string;
  price: number;
  hasDiscount: boolean;
  discountValue: number | null;
  provider: ProductProvider;
}

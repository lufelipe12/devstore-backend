import axios from 'axios';

import { ProductDto } from '../products/dto/product.dto';
import { ClientOneProductDto } from './dtos/clientOneProduct.dto';
import { ClientTwoProductDto } from './dtos/clientTwoProduct.dto';
import { ProductProvider } from './enums/product-provider.enum';

export class ProviderOneClient {
  constructor(
    private client = axios.create({
      baseURL:
        'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider',
    }),
  ) {}

  async getProducts() {
    try {
      const providerOneProducts = await this.client
        .get('')
        .then((res) => res.data);

      const products = providerOneProducts.map((product) =>
        this.modelProviderOneProduct(product),
      );

      return products;
    } catch (error) {
      throw error;
    }
  }

  modelProviderOneProduct(product: ClientOneProductDto) {
    const {
      id,
      categoria,
      departamento,
      descricao,
      imagem,
      material,
      nome,
      preco,
    } = product;

    const newProduct: ProductDto = {
      name: nome,
      image: imagem,
      description: descricao,
      hasDiscount: false,
      discountValue: null,
      price: preco,
      provider: ProductProvider.Brazil,
    };

    return newProduct;
  }
}

export class ProviderTwoClient {
  constructor(
    private client = axios.create({
      baseURL:
        ' http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider',
    }),
  ) {}

  async getProducts() {
    try {
      const providerTwoProducts = await this.client
        .get('')
        .then((res) => res.data);

      const products = providerTwoProducts.map((product) =>
        this.modelProviderTwoProduct(product),
      );

      return products;
    } catch (error) {
      throw error;
    }
  }

  modelProviderTwoProduct(product: ClientTwoProductDto) {
    const {
      id,
      name,
      description,
      price,
      hasDiscount,
      details,
      gallery,
      discountValue,
    } = product;

    const newProduct: ProductDto = {
      name,
      image: gallery[0],
      description,
      hasDiscount,
      discountValue,
      price: price * discountValue,
      provider: ProductProvider.Europe,
    };

    return newProduct;
  }
}

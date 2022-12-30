export class ClientTwoProductDto {
  hasDiscount: boolean;
  name: string;
  gallery: string[];
  description: string;
  price: number;
  discountValue: number;
  details: ClientTwoProductDetails;
  id: number;
}

class ClientTwoProductDetails {
  adjective: string;
  material: string;
}

import { StrapiImage } from './StrapiImage';

export interface ProductsTypes {
  id: number;
  title: string;
  type: string;
  product_type_items: Array<Product>;
  titleCarousel: string;
  cardType: Array<Card>;
  textsBmf: TextBmf;
}

interface Product {
  id: number;
  title: string;
  description: string;
}

interface Card {
  id: number;
  title: string;
  description: string;
  background: StrapiImage;
  background_mobile: StrapiImage;
}

interface TextBmf {
  id: number;
  title: string;
  description: string;
  description2: string;
  subTitle: string;
}

import { StrapiImage } from "./StrapiImage";
import { StrapiLink } from "./StrapiLink";

export interface SimpleBanner {
  id: number;
  title: string;
  description: string;
  link?: StrapiLink;
  image: StrapiImage;
  imageMobile?: StrapiImage;
  visible?: boolean;
}

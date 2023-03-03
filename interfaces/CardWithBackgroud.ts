import { StrapiLink } from "./StrapiLink";

export interface CardWithBackground {
  title: string;
  description: string;
  link?: StrapiLink;
  textAlt?: string;
  isBeAnAdvisorCard?: boolean;
}

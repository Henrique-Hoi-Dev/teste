import { StrapiImage } from "@/interfaces/StrapiImage";
import { StrapiLink } from "@/interfaces/StrapiLink";
import { StrapiLinkImage } from "@/interfaces/StrapiLinkImage";
import { StrapiModal } from "./StrapiModal";

export interface Footer {
  data: {
    id: number;
    attributes: FooterAttributes;
  };
}

export interface FooterAttributes {
  logo: StrapiImage;
  instagram_link: string;
  facebook_link: string;
  linkedin_link: string;
  youtube_link: string;
  menu: Array<MenuLink>;
  contactUsMenu: {
    id: number;
    title: string;
    contacts: Array<Contact>;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  link_denuncia: StrapiLink;
  link_app_download: StrapiLink;
  app_store_image: StrapiLinkImage;
  google_play_image: StrapiLinkImage;
  label_open_disclaimer: string;
  disclaimer_modal: StrapiModal;
  copyright: string;
  stamps: Stamps;
  address: Address;
  lgpd: Lgpd;
  link_bcb: StrapiLink;
  link_cvm: StrapiLink;
}

export interface MenuLink {
  href: string;
  label: string;
  subItems?: Array<MenuLink>;
}

interface Contact {
  id: number;
  title: string;
  number: string;
}

interface Lgpd {
  id: number;
  title: string;
  link: StrapiLink;
}

interface Address {
  id: number;
  title: string;
  address: string;
}

interface Stamps {
  data: Array<Stamp>;
}

interface Stamp {
  id: number;
  attributes: {
    name: string;
    alternativeText: string;
    caption: string;
    width: number;
    height: number;
    formats: string;
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string;
    provider: string;
    provider_metadata: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

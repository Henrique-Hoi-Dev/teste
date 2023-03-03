import { StrapiImage } from "@/interfaces/StrapiImage";

export interface Header {
  data: {
    id: number;
    attributes: HeaderAttributes;
  };
}

export interface HeaderAttributes {
  create_account_link: {
    Url: string;
    Label: string;
  };
  login_link: {
    Url: string;
    Label: string;
  };
  searchMenu: ISearchMenu;
  menu: Array<MenuLink>;
  logo: StrapiImage;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface ISearchMenu {
  title: string;
  searchPlaceholder: string;
  notFoundTitle: string;
  notFoundDescription: string;
  pageLinkLabel: string;
  errorTitle: string;
  errorDescription: string;
}

export interface MenuLink {
  href: string;
  label: string;
  subItems?: Array<MenuLink>;
  disabled?: boolean;
}

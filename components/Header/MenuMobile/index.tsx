import React, { useState } from "react";
import { useRouter } from "next/router";
import { Dropdown } from "@/components/Common/Dropdown";
import { CloseIcon, SearchIcon } from "@/icons/index";
import { ISearchMenu, MenuLink } from "@/interfaces/Header";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { default as NextLink } from "next/link";
import styles from "./styles.module.scss";
import SearchMenu from "../SearchMenu";
import { LanguagePicker } from "../LanguagePicker";

interface Props {
  isMenuMobileOpen: boolean;
  setIsMenuMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
  menu: Array<MenuLink>;
  renderActionButtons: () => React.ReactNode;
  logoUrl: string;
  searchMenu: ISearchMenu;
}

export function MenuMobile({
  isMenuMobileOpen,
  setIsMenuMobileOpen,
  menu,
  renderActionButtons,
  logoUrl,
  searchMenu,
}: Props) {
  const router = useRouter();

  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const closeMenuMobile = () => {
    setIsMenuMobileOpen(false);
  };

  function handleSearchMenuClose() {
    setSearchMenuOpen(false);
    setIsMenuMobileOpen(false);
  }

  const handleClick = (e: any, path: string) => {
    e.preventDefault();
    router.push(path);

    closeMenuMobile();
  };

  const renderMenu = (menu: MenuLink) => (
    <div key={menu.label} className={styles["menu-mobile__item"]}>
      {menu.subItems ? (
        <Dropdown
          actionButtonTitle={menu.label.toUpperCase()}
          className={styles.dropdown}
        >
          {menu?.subItems?.map((item) => renderSubMenuWithSubItems(item, 0))}
        </Dropdown>
      ) : (
        <a
          className={styles["menu-mobile__link_tag"]}
          onClick={(e) => handleClick(e, menu.href)}
        >
          {menu.label.toUpperCase()}
        </a>
      )}
    </div>
  );

  const renderSubMenuWithSubItems = (subMenu: MenuLink, depth: number) => {
    const additionalClassName = depth >= 1 ? "ml-15" : "";

    if (subMenu.disabled) return <> </>;

    if (Array.isArray(subMenu.subItems) && subMenu.subItems.length > 0) {
      return (
        <li
          key={subMenu.href}
          className={`${styles["menu-mobile__submenu"]} ${additionalClassName}`}
        >
          <strong className={styles["menu-mobile__submenu__header"]}>
            {subMenu.label}
          </strong>
          {subMenu.subItems.map((link) =>
            renderSubMenuWithSubItems(link, depth + 1)
          )}
        </li>
      );
    }

    return (
      <a
        className={`${styles["menu-mobile__dropdown__item"]}`}
        key={subMenu.href}
        onClick={(e) => handleClick(e, subMenu.href)}
      >
        {subMenu.label}
      </a>
    );
  };

  return (
    <div className={styles["menu-mobile"]} aria-hidden={!isMenuMobileOpen}>
      <SearchMenu
        {...searchMenu}
        visible={searchMenuOpen}
        onClose={handleSearchMenuClose}
        onCrossClick={() => setSearchMenuOpen(false)}
      />
      <header>
        <NextLink href="/">
          <StrapiImage src={logoUrl} alt={""} />
        </NextLink>
        <button
          className={styles["menu-mobile__button-search"]}
          onClick={() => setSearchMenuOpen(!searchMenuOpen)}
        >
          <SearchIcon className={styles["menu-mobile__search"]} />
        </button>
        <CloseIcon
          className={styles["menu-mobile__close"]}
          onClick={closeMenuMobile}
          strokeWidth={0.8}
        />
      </header>
      <section className={styles["menu-mobile__body"]}>
        <div>{menu.map((menu) => renderMenu(menu))}</div>
        <section>
          <LanguagePicker />
          <div className={styles["menu-mobile__action-buttons"]}>
            {renderActionButtons()}
          </div>
        </section>
      </section>
    </div>
  );
}

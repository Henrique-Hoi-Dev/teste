import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { Link } from "@/components/Common/Link";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { default as NextLink } from "next/link";
import { HeaderAttributes } from "@/interfaces/index";
import { SearchIcon, Menu as MenuIcon } from "@/icons/index";
import { Menu } from "./Menu";
import { MenuMobile } from "./MenuMobile";
import SearchMenu from "./SearchMenu";
import { LanguagePicker } from "./LanguagePicker";
import { Logo } from "@/icons/Logo";

interface Props extends HeaderAttributes {}

export function Header(props: Props) {
  const { create_account_link, login_link, menu, logo, searchMenu } = props;

  const [statusTheme, setStatusTheme] = useState(false);
  console.log("🚀 ~ file: index.tsx:20 ~ Header ~ statusTheme:", statusTheme);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;
      const newPosition = scrollTop / (scrollHeight - clientHeight);

      if (newPosition > 0) {
        setStatusTheme(true);
      }
      if (newPosition <= 0.01) {
        setStatusTheme(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [statusTheme]);

  const renderActionButtons = () => (
    <>
      <Link
        className={`${statusTheme && styles["linkTheme"]}`}
        href={login_link.Url}
      >
        {login_link.Label}
      </Link>
      <Link variant="contained" href={create_account_link.Url}>
        {create_account_link.Label}
      </Link>
    </>
  );

  const handleSearchMenuClose = useCallback(() => {
    setSearchMenuOpen(false);
  }, []);

  return (
    <>
      <SearchMenu
        {...searchMenu}
        visible={searchMenuOpen}
        onClose={handleSearchMenuClose}
      />
      <header className={styles["header-container"]}>
        <nav
          className={`${styles.navbar} ${statusTheme && styles.navbar__blue}`}
        >
          <div className={styles.navbar__content}>
            <picture className={styles.navbar__logo}>
              <NextLink href="/">
                <Logo
                  stroke={statusTheme ? "#ffffff" : "#1B3E70"}
                  color={statusTheme ? "#ffffff" : "#F58220"}
                />
              </NextLink>
            </picture>
            <section>
              <div className={styles.navbar__button_list}>
                <Menu
                  menu={menu}
                  className={`${statusTheme && styles["themeBlue"]}`}
                  classNameSubItem={`${statusTheme && styles["subitem"]}`}
                />
              </div>
              <div className={styles.navbar__action_buttons}>
                {renderActionButtons()}
              </div>
              <div className={styles.navbar__icon_buttons}>
                <button onClick={() => setSearchMenuOpen(!searchMenuOpen)}>
                  <SearchIcon stroke={statusTheme ? "#ffffff" : "#222222"} />
                </button>

                <LanguagePicker className="hidden-tablet" />

                <button className={styles["navbar__open-menu-btn"]}>
                  <MenuIcon
                    stroke={statusTheme ? "#ffffff" : "#000000"}
                    onClick={() => setIsMenuOpen(true)}
                  />
                </button>
              </div>
            </section>
          </div>
        </nav>

        <MenuMobile
          logoUrl={logo.data.attributes.url}
          menu={menu}
          isMenuMobileOpen={isMenuOpen}
          setIsMenuMobileOpen={setIsMenuOpen}
          renderActionButtons={renderActionButtons}
          searchMenu={searchMenu}
        />
      </header>
    </>
  );
}

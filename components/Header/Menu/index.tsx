import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/Common/Button";
import { MenuLink } from "@/interfaces/Header";
import { ChevronRight as ArrowRight } from "@/icons/ChevronRight";
import styles from "./styles.module.scss";
import { HoverOutsideContainer } from "@/components/HoverOutsideContainer";
import { ChevronDown } from "@/icons/ChevronDown";

interface Props {
  menu: Array<MenuLink>;
  className?: string;
  classNameSubItem?: string;
}

type menu = Props["menu"];

export function Menu(props: Props) {
  const { menu, className, classNameSubItem } = props;
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<string>("Sobre");
  const [activeSubMenus, setActiveSubMenus] = useState<Array<menu> | null>(
    null
  );

  const onSubMenuChange = (activeMenu?: Array<MenuLink>, depth?: number) => {
    if (activeMenu) {
      const activeSubMenusCopy = activeSubMenus
        ? activeSubMenus.slice(0, depth)
        : [];
      activeSubMenusCopy[depth ?? 0] = activeMenu;

      setActiveSubMenus(activeSubMenusCopy);
    } else {
      const activeSubMenusCopy = activeSubMenus ? [...activeSubMenus] : [];
      activeSubMenusCopy.splice(depth ?? 0, 1);

      setActiveSubMenus(activeSubMenusCopy);
    }
  };

  const openMenu = (menu: string) => {
    setActiveMenu(menu);
  };

  const closeSubMenus = useCallback(() => {
    setActiveSubMenus(null);
  }, []);

  const renderLinkSubmenus = (subMenus: Array<MenuLink>) => {
    return (
      <div className={styles.menu__subitems__container}>
        <div className={`${styles.menu__subitems} ${classNameSubItem}`}>
          {renderSubMenu(subMenus, 0)}
        </div>
        {Array.isArray(activeSubMenus) &&
          activeSubMenus.map((submenu, index) =>
            renderSubMenu(submenu, index + 1)
          )}
      </div>
    );
  };

  const renderSubMenu = (subMenus: Array<MenuLink>, depth: number) => (
    <div className={`${styles.menu__subitems} ${classNameSubItem}`}>
      {subMenus &&
        subMenus.map((link) => {
          const haveSubMenu = link.subItems?.length;

          const onClick = haveSubMenu ? () => {} : () => router.push(link.href);

          if (link.disabled) return <> </>;

          return (
            <div key={link.label} className={styles["menu__subitems__item"]}>
              <Button
                buttonType="terciary"
                onClick={onClick}
                onMouseOver={() => onSubMenuChange(link.subItems, depth)}
                icon={haveSubMenu && <ArrowRight />}
              >
                {link.label}
              </Button>
            </div>
          );
        })}
    </div>
  );

  const onHoverOutside = () => {
    if (activeSubMenus) closeSubMenus();
    else setActiveMenu("");
  };

  useEffect(() => {
    closeSubMenus();
  }, [activeMenu, closeSubMenus]);

  return (
    <HoverOutsideContainer onHoverOutside={onHoverOutside}>
      <menu className={styles.menu}>
        <section className={`${styles.menu__content} container`}>
          {menu.map((link) => {
            const isMenuActive = link.label === activeMenu;

            const onClick = !link.subItems
              ? () => router.push(link.href)
              : () => {};

            return (
              <div
                className={`${styles.menu__item} ${className}`}
                onMouseOver={() => openMenu(link.label)}
                role="button"
                key={link.label}
              >
                <Button buttonType="terciary" onClick={onClick}>
                  {link.label}
                  <div className={styles.menu__item__icon_wrapper}>
                    <ChevronDown
                      aria-pressed={!!isMenuActive}
                      display={link.subItems?.length ?? 0 > 0 ? "flex" : "none"}
                    />
                  </div>
                </Button>
                {isMenuActive &&
                  link.subItems &&
                  link.subItems?.length > 0 &&
                  renderLinkSubmenus(link.subItems)}
              </div>
            );
          })}
        </section>
      </menu>
    </HoverOutsideContainer>
  );
}

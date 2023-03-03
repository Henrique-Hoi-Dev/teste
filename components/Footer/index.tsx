import React, { useState } from "react";
import { StrapiImage } from "@/components/Common/StrapiImage";
import { Button } from "@/components/Common/Button";
import { Link } from "@/components/Common/Link";
import NextLink from "next/link";
import ReactMarkdown from "react-markdown";
import { FiFacebook, FiInstagram, FiYoutube, FiLinkedin } from "react-icons/fi";
import { Dropdown } from "@/components/Common/Dropdown";
import { Modal } from "@/components/Common/Modal";
import { GetScreenType } from "@/utils/hooks/getScreenType";
import { Footer } from "@/interfaces/Footer";
import { createTelephoneHref } from "@/utils/createTelephoneHref";
import styles from "./styles.module.scss";
import { MOBILE_BREAKPOINT } from "@/utils/breakpoints";

export interface MenuLink {
  href: string;
  label: string;
  subItems?: Array<MenuLink>;
  disabled?: boolean;
}

type FooterProps = Footer["data"]["attributes"];

export function Footer(props: FooterProps) {
  const {
    menu,
    logo,
    app_store_image,
    google_play_image,
    link_app_download,
    link_denuncia,
    instagram_link,
    linkedin_link,
    youtube_link,
    facebook_link,
    label_open_disclaimer,
    disclaimer_modal,
    copyright,
    contactUsMenu,
    lgpd,
    address,
    stamps,
    link_bcb,
    link_cvm,
  } = props;

  const [isPrivacyPolicyModalOpen, setIsPrivacyPolicyModalOpen] =
    useState(false);

  const togglePrivacyPolicyModal = () => {
    setIsPrivacyPolicyModalOpen((prevState) => !prevState);
  };

  const customScreenSettings = {
    mobile: MOBILE_BREAKPOINT,
    tablet: 1000,
  };

  const screenType = GetScreenType(customScreenSettings);

  const renderMenu = () => (
    <>
      {menu.map((menuItem) => (
        <div key={menuItem.label} className={styles["footer__menu-item"]}>
          {renderSimpleMenuLink(menuItem)}
          <div className={styles["footer__menu__subitems"]}>
            {menuItem.subItems?.map((item) => renderSubMenu(item, 0))}
          </div>
        </div>
      ))}
      {renderContactUsMenu()}
      {renderStamps()}
      {renderDownloadSection()}
    </>
  );

  const renderContactUsMenu = () => (
    <ul className={styles["footer__menu-item"]}>
      {renderSimpleMenuLink({ label: contactUsMenu.title, href: "/about-us" })}

      {contactUsMenu.contacts.map((item) => (
        <li key={item.id} className={styles["footer__menu__subitems"]}>
          <strong className={styles["footer__submenu__title"]}>
            {item.title}
          </strong>
          <a
            className={styles["footer__telephone"]}
            href={createTelephoneHref(item.number)}
          >
            {item.number}
          </a>
        </li>
      ))}
      <li className={styles["footer__menu__subitems"]} key={lgpd.id}>
        <strong className={styles["footer__lgpd_title"]}>{lgpd.title}</strong>
        <Link href={lgpd.link.Url} target={lgpd.link.Target}>
          {lgpd.link.Label}
        </Link>
      </li>
      <li className={styles["footer__menu__subitems"]} key={address.id}>
        <strong className={styles["footer__submenu__title"]}>
          {address.title}
        </strong>
        <p className={styles["footer__address"]}>{address.address}</p>
      </li>
    </ul>
  );

  const renderMenuMobile = () => (
    <>
      {menu.map((menuItem) => (
        <div key={menuItem.label} className={styles["footer__menu-item"]}>
          {!menuItem.subItems ? (
            renderSimpleMenuLink(menuItem)
          ) : (
            <Dropdown
              key={menuItem.label}
              className={styles["footer__menu__title"]}
              actionButtonTitle={menuItem.label}
            >
              <div className={styles["footer__menu__subitems"]}>
                {menuItem.subItems.map((item) => renderSubMenu(item, 0))}
              </div>
            </Dropdown>
          )}
        </div>
      ))}
      {renderStamps()}
      {renderDownloadSection()}
    </>
  );

  const renderSubMenu = (subMenu: MenuLink, depth: number) => {
    const customClassName = depth >= 1 ? "ml-15 mt-0" : "";

    if (subMenu.disabled) return <> </>;

    if (subMenu.subItems)
      return (
        <div
          key={subMenu.href}
          className={`${styles["footer__menu__subitems"]} ${customClassName}`}
        >
          <strong className={styles["footer__submenu__title"]}>
            {subMenu.label}
          </strong>
          {subMenu.subItems.map((item) => renderSubMenu(item, depth + 1))}
        </div>
      );

    return (
      <Link className={styles["footer__menu__subitem"]} href={subMenu.href}>
        {subMenu.label}
      </Link>
    );
  };

  const renderSimpleMenuLink = (menuItem: MenuLink) => {
    if (menuItem.disabled) return <> </>;

    return menuItem.subItems ? (
      <strong className={styles["footer__menu__title"]}>
        {menuItem.label.toUpperCase()}
      </strong>
    ) : (
      <Link className={styles["footer__menu__title"]} href={menuItem.href}>
        {menuItem.label.toUpperCase()}
      </Link>
    );
  };

  const renderDownloadSection = () => (
    <div className={styles["footer__menu-item"]}>
      {renderSimpleMenuLink({
        href: link_app_download.Url,
        label: link_app_download.Label,
      })}
      <div className={styles["footer__download-app"]}>
        <NextLink href={app_store_image.url}>
          <StrapiImage
            src={app_store_image.image.data.attributes.url}
            alt={app_store_image.image.data.attributes.alternativeText}
          />
        </NextLink>

        <NextLink href={google_play_image.url}>
          <StrapiImage
            src={google_play_image.image.data.attributes.url}
            alt={google_play_image.image.data.attributes.alternativeText}
          />
        </NextLink>
      </div>
    </div>
  );

  const renderStamps = () => (
    <div className={styles["footer__menu-item__stamps"]}>
      {stamps.data.map((stamp, index) => {
        if (index === 3)
          return (
            <>
              <StrapiImage
                className={`${styles["footer__stamp"]}`}
                key={stamp.id}
                src={stamp.attributes.url}
              />
              <hr className={styles["footer__stamp__divider"]} />
            </>
          );

        return (
          <StrapiImage
            className={`${styles["footer__stamp"]}`}
            key={stamp.id}
            src={stamp.attributes.url}
          />
        );
      })}
    </div>
  );

  return (
    <footer className={styles.footer}>
      <section className={styles["footer__top-items"]}>
        <div className={styles["footer__top-items__content"]}>
          <StrapiImage
            className={styles.footer__logo}
            src={logo.data.attributes.url}
          />
          <div className={styles["footer__social-networks-container"]}>
            <Link
              className="hidden-mobile"
              href={link_denuncia.Url}
              target={link_denuncia.Target}
            >
              {link_denuncia.Label}
            </Link>
            <NextLink href={facebook_link}>
              <FiFacebook className={styles.icon} />
            </NextLink>
            <NextLink href={instagram_link}>
              <FiInstagram />
            </NextLink>
            <NextLink href={youtube_link}>
              <FiYoutube />
            </NextLink>
            <NextLink href={linkedin_link}>
              <FiLinkedin />
            </NextLink>
          </div>
        </div>
      </section>
      <div className="container">
        <section className={styles.footer__menu}>
          {screenType !== "desktop" ? renderMenuMobile() : renderMenu()}
        </section>
      </div>
      <section className={styles["footer__bottom"]}>
        <div className="container">
          <Link
            className="mobile-visible"
            href={link_denuncia.Url}
            target={link_denuncia.Target}
          >
            {link_denuncia.Label}
          </Link>
          <Button onClick={togglePrivacyPolicyModal} buttonType="terciary">
            {label_open_disclaimer}
          </Button>
          <div className={styles["footer__bottom__reguladores"]}>
            <strong>Reguladores:</strong>
            <Link href={link_bcb.Url} target={link_bcb.Target}>
              {link_bcb.Label}
            </Link>
            |
            <Link href={link_cvm.Url} target={link_cvm.Target}>
              {link_cvm.Label}
            </Link>
          </div>
          <span> {copyright} </span>
        </div>
      </section>
      <Modal
        className=""
        isOpen={isPrivacyPolicyModalOpen}
        onClose={togglePrivacyPolicyModal}
        label="privacy-policy-footer"
        title={disclaimer_modal.title}
        bottomCloseButtonLabel={disclaimer_modal.bottom_close_button_label}
      >
        <section className={styles["footer__privacy-policy"]}>
          <ReactMarkdown>{disclaimer_modal.modal_content}</ReactMarkdown>
        </section>
      </Modal>
    </footer>
  );
}

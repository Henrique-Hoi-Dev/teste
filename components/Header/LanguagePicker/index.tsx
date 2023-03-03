import { GetScreenType } from "@/utils/hooks/getScreenType";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import styles from "./styles.module.scss";

const flags = {
  "pt-BR": "brasil-flag.png",
  en: "usa-flag.png",
};

const flagsLocalesCode = {
  "pt-BR": "pt-BR",
  en: "en",
};

interface Props {
  className?: string;
}

export function LanguagePicker(props: Props) {
  const { className = "" } = props;

  const router = useRouter();
  const screenType = GetScreenType();

  const [isOptionsListOpen, setIsOptionsListOpen] = useState(false);
  const [activeFlag, setActiveFlag] = useState(
    router.query.locale || flagsLocalesCode["pt-BR"]
  );

  const onLocaleChange = (locale: string) => {
    setActiveFlag(locale);

    router.query.locale = flagsLocalesCode[locale];
    router.push(router);
  };

  if (!router.pathname.includes("non-resident-investor")) return <></>;

  const renderMobileLanguagePicker = () => (
    <ul
      className={`${styles["language-picker__options--mobile"]} ${className}`}
    >
      <li
        role="button"
        onClick={() => onLocaleChange(flagsLocalesCode["pt-BR"])}
      >
        <label>
          <input
            type="radio"
            checked={activeFlag === flagsLocalesCode["pt-BR"]}
          />
          <span></span>
          <picture>
            <img src="brasil-flag.png" alt="brasil flag" />
          </picture>
        </label>
      </li>

      <li role="button" onClick={() => onLocaleChange(flagsLocalesCode.en)}>
        <label>
          <input type="radio" checked={activeFlag === flagsLocalesCode.en} />
          <span></span>
          <picture>
            <img src="usa-flag.png" alt="usa flag" />
          </picture>
        </label>
      </li>
    </ul>
  );

  return screenType === "desktop" ? (
    <div className={`${styles["language-picker-container"]} ${className}`}>
      <div
        className={styles["language-picker"]}
        role="button"
        onClick={() => setIsOptionsListOpen((prevState) => !prevState)}
      >
        <picture>
          <img alt="flag" src={flags[activeFlag]} />
        </picture>

        <BsChevronDown aria-pressed={isOptionsListOpen} />
        {isOptionsListOpen && (
          <ul className={styles["language-picker__options"]}>
            <li role="button" onClick={() => onLocaleChange("pt-BR")}>
              <picture>
                <img src="brasil-flag.png" alt="brasil flag" />
              </picture>
            </li>

            <li role="button" onClick={() => onLocaleChange("en")}>
              <picture>
                <img src="usa-flag.png" alt="usa flag" />
              </picture>
            </li>
          </ul>
        )}
      </div>
    </div>
  ) : (
    renderMobileLanguagePicker()
  );
}

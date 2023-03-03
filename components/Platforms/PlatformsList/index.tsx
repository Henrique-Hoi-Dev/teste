import React from "react";
import ScrollContainer from "react-indiana-drag-scroll";
import styles from "./styles.module.scss";
import {
  TradingPlatforms,
  TradingPlatform,
} from "@/endpoints/fetchTradingPlatforms";
import { Card } from "@/components/Platforms/Card";

interface Props extends TradingPlatforms {}

export function PlatformsList(props: Props) {
  const { data = [] } = props;

  function getTradingPlatformsGroupedByDeveloper() {
    let tradingPlatformsByDeveloper: { [key: string]: Array<TradingPlatform> } =
      {};

    let miraeTradingPlatforms: { [key: string]: Array<TradingPlatform> } = {};

    data.forEach((platform) => {
      if (platform.attributes.developer.data) {
        const { name } = platform.attributes.developer.data.attributes;

        if (name.toLowerCase().includes("mirae")) {
          if (!miraeTradingPlatforms[name]) miraeTradingPlatforms[name] = [];

          miraeTradingPlatforms[name].push(platform);
        } else {
          if (!tradingPlatformsByDeveloper[name]) {
            tradingPlatformsByDeveloper[name] = [];
          }

          tradingPlatformsByDeveloper[name].push(platform);
        }
      }
    });

    return { tradingPlatformsByDeveloper, miraeTradingPlatforms };
  }

  const {
    tradingPlatformsByDeveloper: groupedPlatforms,
    miraeTradingPlatforms,
  } = getTradingPlatformsGroupedByDeveloper();

  const renderPlatforms = () => {
    return (
      <>
        {Object.keys(miraeTradingPlatforms).map((key) => (
          <div
            key={key}
            className={styles["platforms"]}
            role="list"
            aria-label={`${key}-platforms`}
          >
            <h2 className={styles["platforms__title"]}>{key}</h2>
            <div className={styles["platforms__divider"]}></div>
            <ScrollContainer className={styles["platforms__list"]}>
              {renderDeveloperPlatforms(miraeTradingPlatforms[key])}
            </ScrollContainer>
          </div>
        ))}
        {Object.keys(groupedPlatforms).map((key) => (
          <div
            key={key}
            className={styles["platforms"]}
            role="list"
            aria-label={`${key}-platforms`}
          >
            <h2 className={styles["platforms__title"]}>{key}</h2>
            <div className={styles["platforms__divider"]}></div>
            <ScrollContainer className={styles["platforms__list"]}>
              {renderDeveloperPlatforms(groupedPlatforms[key])}
            </ScrollContainer>
          </div>
        ))}
      </>
    );
  };

  const renderDeveloperPlatforms = (platforms: Array<TradingPlatform>) => (
    <>
      {platforms?.map((platform) => {
        const { attributes } = platform;
        return (
          <Card
            key={attributes.title}
            title={attributes.title}
            description={attributes.description}
            labelButton={attributes.labelButton}
            href="https://corretora.miraeasset.com.br/Home/Login"
          />
        );
      })}
    </>
  );

  return <section>{renderPlatforms()}</section>;
}
